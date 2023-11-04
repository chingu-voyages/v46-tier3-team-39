"use client";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { Button } from "@mui/material";
export const SubscribeAction = () => {
  const {
    setRef,
    position: { height: inputHeight },
  } = useElementPosition();
  return (
    <div
      className="flex flex-col space-y-3 items-end sm:flex-row sm:space-y-0"
    >
      <TextFieldInput
        ref={setRef}
        size={"small"}
        labelContainerClassNames="mb-3 font-semibold text-md text-Black tracking-tight"
        label="Join us"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className=" w-full h-full rounded-none [&>*]:rounded-none"
        autoComplete="email"
        InputProps={{
          classes: {
            input: "text-sm"
          }
        }}
      />
      <Button
        component={"button"}
        type={"submit"}
        sx={{
          textTransform: "none",
          height: inputHeight + "px",
        }}
        size="large"
        className="rounded-none w-full ml-0 sm:ml-4 sm:w-auto"
        variant={"contained"}
        aria-label={"subscribe"}
      >
        Subscribe
      </Button>
    </div>
  );
};
