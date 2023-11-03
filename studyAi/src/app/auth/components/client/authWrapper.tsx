"use client";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { AuthImg } from "../server/authImg";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
const AuthPageWrapper = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = useWindowWidth();
  const {
    setRef,
    position: { height: elementHeight },
  } = useElementPosition();
  const imgStyles = {
    height: elementHeight + "px",
  };
  return (
    <div
      ref={setRef}
      className="bg-White w-full min-h-screen flex flex-col items-center md:justify-center md:flex-row"
    >
      <AuthImg
        containerClassNames="flex h-60 md:hidden"
        style={windowWidth > 768 ? imgStyles : undefined}
      ></AuthImg>
      {children}
      <AuthImg
        containerClassNames="h-full grow hidden md:flex md:min-h-screen md:w-3/6"
        style={windowWidth > 768 ? imgStyles : undefined}
      ></AuthImg>
    </div>
  );
};
export default AuthPageWrapper;
