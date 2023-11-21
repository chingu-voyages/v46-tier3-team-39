"use client";
import { TextFieldInput } from "@/authComponents/server/formInputs";
import { Alert, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter, NextRouter } from "next/router";
import { useRef } from "react";
import { useOriginContext } from "@/app/util/providers/originProvider";
const onGoogleSign = async () =>
  await signIn("google", undefined, {
    prompt: "select_account",
  });
const onEmailSign = async (
  creds: { email: string; password: string },
  router: {
    router: NextRouter;
    isWithinPage: boolean;
  }
) => {
  const signInData = await signIn("credentials", { ...creds, redirect: false });
  if (signInData?.error) {
    console.error(signInData.error, "credentials error");
  }
  if (signInData?.ok && !signInData?.error) {
    const { router: appRouter, isWithinPage } = router;
    if (isWithinPage) appRouter.back();
    else appRouter.push("/dashboard");
  }
};
export const AuthFormBtns = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const isWithinPage = useOriginContext();
  return (
    <div className="flex flex-col w-full">
      <Button
        type="submit"
        variant="text"
        size="medium"
        className="w-full border border-Black bg-Black border-solid text-White rounded-none my-2 hover:text-Black"
        style={{ textTransform: "none" }}
      >
        {type === "login" ? "Login" : "Sign up"}
      </Button>
      <Button
        type="button"
        className="w-full border border-Black bg-White  border-solid text-Black rounded-none my-2"
        style={{ textTransform: "none" }}
        onClick={async () => {
          const signInData = await onGoogleSign();
          if (!signInData) return;
          if (signInData.error)
            return console.error(signInData.error, "google signIn error");
          if (isWithinPage) router.back();
          else router.push("/dashboard");
        }}
      >
        {type === "login" ? "Login" : "Sign up"} With Google
      </Button>
    </div>
  );
};
export const AuthForm = ({
  type,
  errMessageArr,
}: {
  type: "login" | "signup";
  errMessageArr?: { code: string; message: string }[];
}) => {
  const router = useRouter();
  const isWithinPage = useOriginContext();
  //for debounce user inputs
  const submitted = useRef(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted.current) return;
    submitted.current = true;
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const { email, password, name } = data;
      const creds = {
        name: name?.toString(),
        email: email.toString(),
        password: password.toString(),
        provider: "email",
      };
      switch (type) {
        case "login":
          await onEmailSign(
            {
              email: creds.email,
              password: creds.password,
            },
            {
              router,
              isWithinPage,
            }
          );
          return;
        case "signup":
          const res = await axios({
            method: "POST",
            url: "/api/user",
            data: {
              ...creds,
            },
          });
          //immeaditely sign in user
          if (res.data.status === 201) {
            await onEmailSign(
              {
                email: creds.email,
                password: creds.password,
              },
              {
                router,
                isWithinPage,
              }
            );
          } else console.error("Registration Failed");
          break;
      }
    } catch (err) {
      console.error(err);
    } finally {
      submitted.current = false;
    }
  };
  return (
    <form
      className="flex flex-col h-full w-full items-center lg:w-4/6 max-w-m"
      onSubmit={onSubmit}
    >
      {errMessageArr &&
        errMessageArr.map((err) => (
          <Alert key={err.code} severity="error" className="w-full">
            {err.message}
          </Alert>
        ))}
      <div className="flex flex-col w-full items-end space-y-4">
        {type === "signup" && (
          <TextFieldInput
            size="small"
            className="w-full"
            label="Name"
            labelContainerClassNames="my-2 font-normal text-sm text-Black"
            type="name"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            required
          />
        )}

        <TextFieldInput
          size="small"
          className="w-full"
          label="Email"
          labelContainerClassNames="my-2 font-normal text-sm text-Black"
          type="email"
          name="email"
          placeholder="abc@gmail.com"
          autoComplete="email"
          required
        />
        <TextFieldInput
          size="small"
          label="Password"
          className="w-full"
          type="password"
          name="password"
          placeholder="vk2~#{3*£W37&R"
          autoComplete="current-password"
          required
          labelContainerClassNames="my-2 font-normal text-sm text-Black"
          headerLink={{
            text: "Forgot Password?",
            href: "/auth/forgot-password",
            className: "text-Black text-sm tracking-tight underline",
          }}
        />
        <AuthFormBtns type={type} />
      </div>
    </form>
  );
};
