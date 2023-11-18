import React from "react";
import NextLink from "next/link";
import { GenerateDropdown } from "../client/desktopNavbar";
import AuthenticationNav, {
  RecursiveClassNames,
} from "../client/authentication";
const links = [
  // {
  //   href: "/about",
  //   text: "About",
  // },
  {
    href: "/library/questions",
    text: "Question Library",
  }
];

export const NavbarLinks = ({
  children,
}: {
  children: React.JSX.Element[];
}) => {
  const innerContainer = (
    <div className="flex-row flex w-full h-full items-center">{children}</div>
  );
  return innerContainer;
};
export const NavButtons = () => {
  return (
    <>
      {links.map((link) => (
        <NextLink
          key={link.href}
          href={link.href}
          className="text-Black mb-4 xs:mb-0 xs:ml-4 font-regular tracking-tight text-sm"
        >
          {link.text}
        </NextLink>
      ))}
    </>
  );
};

const authBtnClassNames: RecursiveClassNames = {
  value: null,
  container: {
    value: "items-center h-full",
    links: {
      value: "h-full ml-4 px-4",
    },
  },
};
const DesktopNavbar = () => {
  return (
    <NavbarLinks>
      <NavButtons />
      <GenerateDropdown />
      <AuthenticationNav authBtnClassNames={authBtnClassNames} />
    </NavbarLinks>
  );
};

export default DesktopNavbar;
