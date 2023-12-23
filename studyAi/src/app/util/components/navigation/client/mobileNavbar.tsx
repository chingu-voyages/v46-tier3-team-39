"use client";
import React from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import dynamic from "next/dynamic";
import AuthenticationNav, {
  LogoutBtn,
  RecursiveClassNames,
} from "../client/authentication";
import { NavButtons } from "../server/desktopNavbar";
import { menuItemLinks } from "./desktopNavbar";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
const Drawer = dynamic(() => import("./drawer"), { ssr: false });
export const NavDrawer = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
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
        className="aspect-square text-2xl"
        sx={{ minWidth: "unset" }}
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
          className="absolute top-0 right-0 aspect-square text-3xl"
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
const userProfClassNames: RecursiveClassNames = {
  value: null,
  container: {
    value: "mb-4",
    links: {
      value: null,
    },
  },
};
const MobileNavbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  return (
    <NavDrawer>
      <div className="grow flex flex-col w-full py-[10%] px-[10%]">
        {isLoggedIn && (
          <AuthenticationNav
            classNames={"w-full mb-4 xs:mb-0"}
            // userProfClassNames={userProfClassNames}
            authBtnClassNames={authBtnClassNames}
          />
        )}
        <NavButtons />
        {menuItemLinks.map((link) => (
          <NextLink
            key={link.text}
            href={link.href}
            className="text-Black font-regular flex items-center tracking-tight text-sm mb-4"
          >
            <span>{link.text}</span>
          </NextLink>
        ))}
        {!isLoggedIn && (
          <AuthenticationNav
            classNames={"w-full mb-4 xs:mb-0"}
            authBtnClassNames={authBtnClassNames}
          />
        )}
        {isLoggedIn && (
          <div className="grow flex items-end">
            <LogoutBtn size="large" icon={false} />
          </div>
        )}
      </div>
    </NavDrawer>
  );
};
export default MobileNavbar;
