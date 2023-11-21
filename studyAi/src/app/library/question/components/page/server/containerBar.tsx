import { DetailedHTMLProps, HTMLAttributes } from "react";
export const Container = (
  props: {
    id?: string;
    children: React.ReactNode;
    overflow?: boolean;
    border?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
  } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const copyProps = { ...props };
  const { children, overflow, border, fullWidth, fullHeight } = props;
  const borderClasses = " border-Black border border-solid";
  if ("children" in copyProps) delete copyProps.children;
  if ("border" in copyProps) delete copyProps.border;
  if ("overflow" in copyProps) delete copyProps.overflow;
  if ("fullWidth" in copyProps) delete copyProps.fullWidth;
  if ("fullHeight" in copyProps) delete copyProps.fullHeight;
  return (
    <div
      {...copyProps}
      className={
        "flex flex-col " +
        (fullHeight === false ? "" : " h-full") +
        (fullWidth === false ? "" : " w-full") +
        (border ? " " + borderClasses : "") +
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
        "flex justify-between items-center bg-White h-11 md:h-14 w-full px-3" +
        borderClasses
      }
    >
      {children}
    </div>
  );
};
export default ContainerBar;
