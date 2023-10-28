import { DetailedHTMLProps, HTMLAttributes } from "react";
export const Container = (
  props: {
    children: React.ReactNode;
    overflow?: boolean;
  } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const copyProps = { ...props };
  const { children, overflow } = props;
  if (copyProps.children) delete copyProps.children;
  if ("overflow" in copyProps) delete copyProps.overflow;
  return (
    <div
      {...copyProps}
      className={
        "flex flex-col border-Black border border-solid w-full h-full" +
        (overflow ? " overflow-y-auto" : "") +
        (props.className ? " " + props.className : "")
      }
    >
      {children}
    </div>
  );
};
const ContainerBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between bg-White border-solid border  w-full">
      {children}
    </div>
  );
};
export default ContainerBar;
