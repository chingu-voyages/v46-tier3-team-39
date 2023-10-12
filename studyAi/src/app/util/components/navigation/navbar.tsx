import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Image
          src={"./icons/logo.svg"}
          alt="Study AI logo"
          className="h-full w-auto"
          fill
        />
        <Typography variant="h6">Study AI</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
