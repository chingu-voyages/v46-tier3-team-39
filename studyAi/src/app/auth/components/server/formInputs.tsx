import NextLink from "next/link";
import { TextField, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
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
export const TextFieldInput = forwardRef(
  (props: TextFieldProps & TextFieldInputCustomProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const nonFieldProps: TextFieldInputCustomProps = {
      headerLink: undefined,
      labelContainerClassNames: undefined,
      containerClassNames: undefined,
      labelClassNames: undefined,
    };
    const fieldProps = { ...props, label: undefined };
    //filter out key from dom
    Object.entries(props).forEach(([key, value]) => {
      const indexedKey = key as keyof (TextFieldProps &
        TextFieldInputCustomProps);
      if (indexedKey in nonFieldProps) delete fieldProps[indexedKey];
    });
    const labelClassNames =
      "grow h-full " + (props.labelClassNames ? props.labelClassNames : "");
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
        <TextField ref={ref} {...fieldProps} />
      </div>
    );
  }
);
