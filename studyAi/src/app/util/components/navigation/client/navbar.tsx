"use client";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import DesktopNavbar from "../server/desktopNavbar";
import MobileNavbar from "../client/mobileNavbar";
import { AppBar } from "@mui/material";
import { Logo } from "../../logo/client/Logo";
const Navbar = () => {
  const windowWidth = useWindowWidth();
  return (
    <AppBar
      position="static"
      className="bg-White rounded-none p-2 px-[3%] md:px-[5%] h-14 border-b border-Black border-solid"
    >
      <div className="flex items-center justify-between xs:justify-start flex-row h-full w-full max-w-screen-xl mx-auto">
        <Logo showLabel={false} />
        {windowWidth > 480 ? <DesktopNavbar /> : <MobileNavbar />}
      </div>
    </AppBar>
  );
};
export default Navbar;
