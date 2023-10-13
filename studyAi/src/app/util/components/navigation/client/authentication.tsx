"use-client";
import NextLink from "next/link";
import { MenuItem, Menu, Link } from "@mui/material";

const authenicationLinks = [
  {
    href: "/auth/signup",
    text: "Join us",
  },
  {
    href: "/auth/login",
    text: "Login",
  },
];
const AuthenticationButtons = () => {
  const isLoggedIn: boolean = false;
  const userId = "XXXXXXXXXXXXXXXXXXX";
  return (
    <div className="flex items-center h-full">
      {authenicationLinks.map((link, idx) => (
        <NextLink
          className={`${
            idx !== 0 ? "text-Black bg-White" : "text-White bg-Black"
          } border-Black border-solid border font-regular text-sm flex items-center h-full ml-4 px-4`}
          href={link.href}
          key={link.href}
        >
          {link.text}
        </NextLink>
      ))}
    </div>
  );
};
const UserProfile = ({
  showUserInfo = false,
  onClick,
}: {
  showUserInfo?: boolean;
  onClick?: () => void;
}) => {
  const isLoggedIn: boolean = true;
  const email = "arkyasmal@gmail.com";
  const name = "Arky Name";
  return (
    <div className="flex items-center">
      {showUserInfo && (
        <div className="flex flex-col w-full mr-4">
          <span className="text-Black font-regular tracking-tight text-sm mb-2">
            {name}
          </span>
          <span
            className="text-Black font-regular tracking-tight text-sm"
          >{email}</span>
        </div>
      )}
      {/* <Link
        component="button"
        aria-controls="close-navigation-drawer"
        aria-hidden="false"
        onClick={handleClick}
        style={{ textTransform: "none", textDecoration: "none" }}
        className="text-Black font-regular tracking-tight text-sm ml-4"
      ></Link> */}
    </div>
  );
};
const AuthenticationNav = () => {
  const isLoggedIn: boolean = false;
  return (
    <div className="grow flex items-center justify-end h-full">
      {isLoggedIn ? <UserProfile /> : <AuthenticationButtons />}
    </div>
  );
};
export default AuthenticationNav;
