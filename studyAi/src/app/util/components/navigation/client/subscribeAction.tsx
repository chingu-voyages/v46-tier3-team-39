"use client";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { AddSubscriber } from "@/gql/mutations/subscriberMutation";
import { useState } from "react";
import { TextFieldInput } from "@/authComponents/server/formInputs";
export const SubscribeAction = () => {
  const {
    elementRef: inputRef,
    setRef,
    position: { height: inputHeight },
  } = useElementPosition();

  const [mutationQuery, { loading, error, data }] = useMutation(AddSubscriber);
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;
    if (!inputRef) return;
    const input = inputRef.querySelector("input") as HTMLInputElement;
    try {
      await mutationQuery({
        variables: {
          email: email.toString(),
        },
      });
      setEmail("");
    } catch (err) {
      console.error(err);
    }
    //clear input value
    input.value = "";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-3 items-end sm:flex-row sm:space-y-0"
    >
      <TextFieldInput
        ref={setRef}
        onChange={(e) => setEmail(e.target.value)}
        size={"small"}
        // label="Enter your email"
        placeholder="Enter your email"
        id="email"
        name="email"
        type="email"
        className=" w-full h-full rounded-none [&>*]:rounded-none"
        autoComplete="email"
        InputProps={{
          classes: {
            input: "text-sm",
          },
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
        className="border-Black rounded-none w-full ml-0 sm:ml-4 sm:w-auto text-Black"
        variant={"outlined"}
        aria-label={"subscribe"}
        disabled={loading}
      >
        Subscribe
      </Button>
    </form>
  );
};
