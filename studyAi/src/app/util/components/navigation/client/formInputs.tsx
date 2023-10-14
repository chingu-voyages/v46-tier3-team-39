import NextLink from "next/link";
import { TextField, TextFieldProps } from "@mui/material";
interface TextFieldInputCustomProps {
  label?: string;
  labelClassNames?: string;
  containerClassNames?: string;
  labelContainerClassNames?: string;
  headerLink?: {
    href: string;
    className?: string;
    text: string;
  };
}
export const TextFieldInput = (
  props: TextFieldProps & TextFieldInputCustomProps
) => {
  const nonFieldProps: TextFieldInputCustomProps = {
    headerLink: undefined,
    labelContainerClassNames: undefined,
    containerClassNames: undefined,
    labelClassNames: undefined,
  };
  const fieldProps = { ...props, ...nonFieldProps, label: undefined };
  const labelClassNames =
    "grow font-normal text-sm text-Black h-full " +
    (props.labelClassNames ? props.labelClassNames : "");
  const labelContainerClassNames =
    "flex w-full items-center " +
    (props.labelContainerClassNames ? props.labelContainerClassNames : "");
  const containerClassNames =
    "flex flex-col w-full " +
    (props.containerClassNames ? props.containerClassNames : "");
  return (
    <div className={containerClassNames}>
      <div className={labelContainerClassNames}>
        <label htmlFor={props.name} className={labelClassNames}>
          {props.label?.toString() + (props.required ? " *" : "")}
        </label>
        {props.headerLink && (
          <NextLink {...props.headerLink}>{props.headerLink.text}</NextLink>
        )}
      </div>
      <TextField {...fieldProps} />
    </div>
  );
};
