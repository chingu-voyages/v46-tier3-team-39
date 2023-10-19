"use client";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
const onGoogleSign = () => signIn("google");
export const AuthFormBtns = () => {
  return (
    <div className="flex flex-col w-full">
      <Button
        type="submit"
        variant="text"
        size="medium"
        className="w-full border border-Black bg-Black border-solid text-White rounded-none my-2 hover:text-Black"
        style={{ textTransform: "none" }}
      >
        Log In
      </Button>
      <Button
        type="button"
        className="w-full border border-Black bg-White  border-solid text-Black rounded-none my-2"
        style={{ textTransform: "none" }}
        onClick={onGoogleSign}
      >
        Login With Google
      </Button>
    </div>
  );
};

export const AuthForm = ({ type } : { type: "login" | "signup" }) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;
    const creds = {
      email: email.toString(),
      password: password.toString(),
    };
    if (type === 'login') {
      signIn("credentials", { ...creds, redirect: false }).then((callback) => {
        if (callback?.error) {
          console.error(callback.error);
        }

        if (callback?.ok && !callback?.error) {
          console.log("Logged in successfully!");
        }
      });
    }
    else {
      console.log('signup form');
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
        <AuthFormBtns />
      </div>
    </form>
  );
};
