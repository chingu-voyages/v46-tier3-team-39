"use client";
import React from "react";
import { MenuItem, Menu, Link, Button } from "@mui/material";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import useRemToPixel from "@/app/util/hooks/useRemToPixel";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons/faWandMagicSparkles";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import useDropdown from "@/app/util/hooks/useDropdown";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("../client/drawer"), { ssr: false });
const links = [
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/discover",
    text: "Discover",
  },
];
const menuItemLinks = [
  {
    href: "/",
    text: "Create Question",
    onClick: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => {},
    icon: (
      <FontAwesomeIcon icon={faWandMagicSparkles} className="aspect-square" />
    ),
  },
  {
    href: "/",
    text: "Create Exam",
    icon: <FontAwesomeIcon icon={faFileLines} className="aspect-square" />,
  },
];

export const GenerateDropdown = () => {
  const currRemToPixelVal = useRemToPixel("1rem");
  const { setRef, position: dropdownButtonPos } = useElementPosition();
  const { anchorEl, handleClick, handleClose } = useDropdown();
  return (
    <div className="relative flex items-center m-0 p-0">
      <Link
        ref={setRef}
        component="button"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ textTransform: "none", textDecoration: "none" }}
        className="text-Black font-regular tracking-tight text-sm ml-4"
      >
        <span className="mr-2">Generate</span>
        <FontAwesomeIcon icon={faCaretDown} />
      </Link>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        anchorReference="anchorPosition"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorPosition={
          currRemToPixelVal
            ? {
                top: currRemToPixelVal * 3.5,
                left: dropdownButtonPos.x + dropdownButtonPos.width,
              }
            : undefined
        }
        onClose={handleClose}
      >
        {menuItemLinks.map((link) => (
          <MenuItem
            key={link.text}
            className="text-Black font-regular flex items-center tracking-tight text-sm"
            onClick={(e) => {
              if (link.onClick) link.onClick(e);
              handleClose();
            }}
          >
            {link.icon && link.icon}
            <span className="ml-3">{link.text}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export const NavButtons = () => {
  return (
    <>
      {links.map((link) => (
        <NextLink
          key={link.href}
          href={link.href}
          className="text-Black ml-4 font-regular tracking-tight text-sm"
        >
          {link.text}
        </NextLink>
      ))}
      <GenerateDropdown />
    </>
  );
};
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
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        anchor="right"
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
        {/* <Button
          variant="text"
          aria-label="close-drawer"
          onClick={toggleDrawer(false)}
          className=""
        >
          <FontAwesomeIcon icon={faBars} />
        </Button> */}
        {children}
      </Drawer>
    </>
  );
};
export const NavbarLinks = ({
  children,
}: {
  children: React.JSX.Element[];
}) => {
  const windowWidth = useWindowWidth();
  const reversedChildren = React.Children.map(
    children,
    (child) => child
  ).reverse();
  const innerContainer = (
    <div className="flex-col xs:flex-row flex w-full h-full items-center">
      {windowWidth < 480 ? reversedChildren : children}
    </div>
  );
  if (windowWidth > 480) return innerContainer;
  return <NavDrawer>{innerContainer}</NavDrawer>;
};
