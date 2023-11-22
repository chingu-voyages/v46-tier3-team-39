"use client";
import { TextFieldInput } from "@/authComponents/server/formInputs";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { AddSubscriber } from "@/gql/mutations/subscriberMutation";
export const SubscribeAction = () => {
  const {
    setRef,
    position: { height: inputHeight },
  } = useElementPosition();

  const [mutationQuery, { loading, error, data }] = useMutation(
    AddSubscriber
  );
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;
    
    try {
      await mutationQuery({
        variables: {
          email: email.toString(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
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

