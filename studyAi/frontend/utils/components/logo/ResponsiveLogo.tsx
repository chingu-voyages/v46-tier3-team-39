"use client";
import { Logo } from "./Logo";
import useWindowWidth from "../../../hooks/useWindowWidth";
const AppLogo = () => {
  const windowWidth = useWindowWidth();
  return (
    <div className="flex items-center justify-center md:justify-start h-12 w-full">
      <Logo showLabel={windowWidth > 768} />
    </div>
  );
};
export default AppLogo;
