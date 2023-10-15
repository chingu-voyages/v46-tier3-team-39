"use client";
import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import AuthenticationNav, {
  RecursiveClassNames,
} from "../client/authentication";
import { NavButtons } from "../server/desktopNavbar";
const Drawer = dynamic(() => import("./drawer"), { ssr: false });
export const NavDrawer = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };
  return (
    <>
      <Button
        variant="text"
        aria-label="open-drawer"
        onClick={toggleDrawer(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        anchor="right"
        // className="bg-White"
        // backgroundColor="white"
        innerContainerClassNames="w-full flex-column bg-White"
        open={open}
        onClose={(e) => toggleDrawer(false)(e)}
      >
        <Button
          variant="text"
          aria-label="close-drawer"
          className="absolute top-0 right-0"
          onClick={toggleDrawer(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
        {children}
      </Drawer>
    </>
  );
};
const authBtnClassNames: RecursiveClassNames = {
  value: null,
  container: {
    value: "flex-col w-full p-0",
    links: {
      value: "h-10 justify-center my-2 ml-0",
    },
  },
};
const userProfClassNames = {
  value: null,
  container: {
    value: "",
  },
};
const MobileNavbar = () => {
  const isLoggedIn = true;
  return (
    <NavDrawer>
      <div className="flex flex-col w-full py-[10%] px-[10%]">
        {isLoggedIn && (
          <AuthenticationNav
            classNames={"w-full mb-4 xs:mb-0"}
            authBtnClassNames={authBtnClassNames}
          />
        )}
        <NavButtons />
        {!isLoggedIn && (
          <AuthenticationNav
            classNames={"w-full mb-4 xs:mb-0"}
            authBtnClassNames={authBtnClassNames}
          />
        )}
      </div>
    </NavDrawer>
  );
};
export default MobileNavbar;
