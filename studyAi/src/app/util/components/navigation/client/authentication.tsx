"use-client";

import Link from "next/link";
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
  return (
    <div className="flex items-center h-full">
      {authenicationLinks.map((link, idx) => (
        <Link
          className={`${
            idx !== 0 ? "text-Black bg-White" : "text-White bg-Black"
          } border-Black border-solid border font-regular text-sm flex items-center h-full ml-4 px-4`}
          href={link.href}
          key={link.href}
        >
          {link.text}
        </Link>
      ))}
    </div>
    // <Link
    //   component="button"
    //   aria-controls="dropdown-menu"
    //   aria-haspopup="true"
    //   style={{ textTransform: "none", textDecoration: "none" }}
    //   className="text-Black font-regular tracking-tight text-sm ml-4"
    // >
    //   <span className="mr-2">Generate</span>
    // </Link>
  );
};
const AuthenticationNav = () => {
  return (
    <div className="grow flex items-center justify-end h-full">
      <AuthenticationButtons />
    </div> // <Link href="/auth/login">Login</Link></div>
  );
};
export default AuthenticationNav;
