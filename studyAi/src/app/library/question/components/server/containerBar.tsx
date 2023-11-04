import { DetailedHTMLProps, HTMLAttributes } from "react";
export const Container = (
  props: {
    children: React.ReactNode;
    overflow?: boolean;
    border?: boolean;
    fullWidth?: boolean;
  } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const copyProps = { ...props };
  const { children, overflow, border, fullWidth } = props;
  const borderClasses = " border-Black border border-solid";
  if (copyProps.children) delete copyProps.children;
  if (copyProps.overflow) delete copyProps.overflow;
  if (copyProps.border) delete copyProps.border;
  if ("overflow" in copyProps) delete copyProps.overflow;
  if (copyProps.fullWidth) delete copyProps.fullWidth;
  return (
    <div
      {...copyProps}
      className={
        "flex flex-col h-full" +
        (fullWidth === false ? "" : " w-full") +
        (border ? borderClasses : "") +
        (overflow ? " overflow-y-auto" : "") +
        (props.className ? " " + props.className : "")
      }
    >
      {children}
    </div>
  );
};
const ContainerBar = ({
  children,
  border,
}: {
  children: React.ReactNode;
  border?: boolean;
}) => {
  const borderClasses = border ? " border-solid border-b" : "";
  return (
    <div
      className={
        "flex justify-between items-center bg-White h-14 w-full px-3" +
        borderClasses
      }
    >
      {children}
    </div>
  );
};
export default ContainerBar;
