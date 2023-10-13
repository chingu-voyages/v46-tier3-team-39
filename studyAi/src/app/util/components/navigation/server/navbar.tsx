import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SVGLogo from "../../../icons/logo";
import Link from "next/link";
import { NavButtons } from "../client/navbar";
import AuthenticationNav from "../client/authentication";

const appName = "Study AI";
export const Logo = ({ showLabel = true }: { showLabel?: boolean }) => {
  return (
    <Link href="/" className="flex items-center justify-center relative h-full">
      <SVGLogo className="h-full aspect-square [&>path]:fill-Black" />
      {showLabel && (
        <Typography
          variant="h6"
          className="text-Black font-semibold tracking-tight text-4xl m-2"
        >
          {appName}
        </Typography>
      )}
    </Link>
  );
};

const Navbar = () => {
  return (
    <AppBar
      position="static"
      className="bg-White rounded-none p-2 px-[2%] md:px-[5%] h-14"
    >
      <div className="flex items-center justify-start flex-row h-full w-full max-w-screen-xl mx-auto">
        <Logo showLabel={false} />
        <NavButtons />
        <AuthenticationNav />
      </div>
    </AppBar>
  );
};

export default Navbar;
