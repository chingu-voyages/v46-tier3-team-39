"use client";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
const onGoogleSign = async () => await signIn("google");
const onEmailSign = async (creds: { email: string; password: string }) => {
  const signInData = await signIn("credentials", { ...creds, redirect: false });
  return signInData;
};
export const AuthFormBtns = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
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
          if (signInData.error) return console.error(signInData.error);
          router.push("/dashboard");
        }}
      >
        {type === "login" ? "Login" : "Sign up"} With Google
      </Button>
    </div>
  );
};

export const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email, password, name } = data;
    const creds = {
      name: name.toString(),
      email: email.toString(),
      password: password.toString(),
    };
    switch (type) {
      case "login":
        const loginRes = await onEmailSign(creds);
        if (loginRes?.error) {
          console.error(loginRes.error);
        }
        if (loginRes?.ok && !loginRes?.error) {
          console.log("Logged in successfully!");
          router.push("/dashboard");
        }
        return;
      case "signup":
        const res = await axios({
          method: "POST",
          url: "/api/user",
          data: {
            ...creds,
          },
        });
        if (res.status === 201) router.push("/auth/login");
        else console.error("Registration Failed");
        break;
    }
  };
  return (
    <form
      className="flex flex-col h-full w-full items-center lg:w-4/6 max-w-m"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col w-full items-end space-y-4">
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
