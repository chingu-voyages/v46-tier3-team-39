"use client";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import DesktopNavbar from "../server/desktopNavbar";
import MobileNavbar from "../client/mobileNavbar";
const Navbar = () => {
  const windowWidth = useWindowWidth();
  return windowWidth > 480 ? <DesktopNavbar /> : <MobileNavbar />;
};
export default Navbar;
