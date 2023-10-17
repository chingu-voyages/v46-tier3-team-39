"use client";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { Button } from "@mui/material";

export const SubscribeAction = () => {
  const {
    setRef,
    position: { height: inputHeight },
  } = useElementPosition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;
  };
  return (
    <form className="flex flex-row items-end" onSubmit={onSubmit}>
      <TextFieldInput
        ref={setRef}
        size={"medium"}
        labelContainerClassNames="mb-3 font-bold text-md text-Black tracking-tight"
        label="Join us"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full h-full rounded-none [&>*]:rounded-none"
        autoComplete="email"
      />
      <Button
        component={"button"}
        type={"submit"}
        sx={{
          textTransform: "none",
          height: inputHeight + "px",
        }}
        size="large"
        className="rounded-none ml-4"
        variant={"contained"}
        aria-label={"subscribe"}
      >
        Subscribe
      </Button>
    </form>
  );
};
