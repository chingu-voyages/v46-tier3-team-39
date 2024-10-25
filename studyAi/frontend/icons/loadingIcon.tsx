import { createPortal } from "react-dom";
const styles = {
  viewportContainer: [
    "absolute",
    "top-0",
    "left-0",
    "flex",
    "items-center",
    "justify-center",
    "w-full",
    "h-screen",
  ],
  loading: {
    container: ["relative", "mx-auto", "w-10"],
    svg: {
      container: [
        "animate-spin",
        "h-full",
        "origin-center",
        "w-full",
        "absolute",
        "top-0",
        "bottom-0",
        "left-0",
        "right-0",
        "m-auto",
      ],
      path: ["loading-icon-path"],
    },
  },
};
const LoadingSVGAnimationStyles = () => {
  return (
    <style>
      {` @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
    .loading-icon-path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke: black;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }`}
    </style>
  );
};
const ViewPortWrapper = ({
  children,
  backgroundColor,
  height,
}: {
  children: JSX.Element;
  backgroundColor?: string;
  height?: string | number;
}) => {
  const currViewportClassNames = [...styles.viewportContainer];
  const stylesObj = { backgroundColor: backgroundColor, height: height };
  return createPortal(
    <div className={currViewportClassNames.join(" ")} style={stylesObj}>
      {children}
    </div>,
    document.body
  );
};
const Icon = ({
  width,
  strokeWidth,
}: {
  width?: number | string;
  strokeWidth?: number | string;
}) => {
  const currContainerClassNames = [...styles.loading.container];
  const currSvgClassNames = [...styles.loading.svg.container];
  const currPathClassNames = [...styles.loading.svg.path];
  return (
    <div className={currContainerClassNames.join(" ")} style={{ width: width }}>
      <LoadingSVGAnimationStyles />
      <div className="before:block before:pt-[100%]" />
      <svg className={currSvgClassNames.join(" ")} viewBox="25 25 50 50">
        <circle
          className={currPathClassNames.join(" ")}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
export type LoadingIconProps = {
  width?: number | string;
  strokeWidth?: number | string;
  entireViewPort?: boolean;
  backgroundColor?: string;
  height?: string | number;
};
const LoadingIcon = ({
  width = 100,
  height,
  strokeWidth = 3,
  entireViewPort = false,
  backgroundColor,
}: LoadingIconProps): JSX.Element => {
  return (
    <>
      {entireViewPort ? (
        <ViewPortWrapper backgroundColor={backgroundColor} height={height}>
          <Icon width={width} strokeWidth={strokeWidth} />
        </ViewPortWrapper>
      ) : (
        <Icon width={width} strokeWidth={strokeWidth} />
      )}
    </>
  );
};
export default LoadingIcon;
