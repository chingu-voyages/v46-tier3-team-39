"use client";
import NextLink from "next/link";
import { UserProfileNav } from "@/app/util/components/navigation/client/userProfile";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
export type RecursiveClassNames = {
  [key: string]: RecursiveClassNames | string | null;
  value: string | null;
};
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
const determineAuthBtnStyles = (authBtnClassNames?: RecursiveClassNames) => {
  if (!authBtnClassNames)
    return { authContainerClassName: null, authLinksName: null };
  const authContainer = authBtnClassNames?.container as RecursiveClassNames;
  const authContainerClassName = authContainer.value;
  const authLinks = authContainer.links as RecursiveClassNames;
  const authLinksName = authLinks.value;
  return { authContainerClassName, authLinksName };
};
const AuthenticationButtons = ({
  authBtnClassNames,
}: {
  authBtnClassNames?: RecursiveClassNames;
}) => {
  const { authContainerClassName, authLinksName } =
    determineAuthBtnStyles(authBtnClassNames);
  return (
    <div className={`flex ${authContainerClassName}`}>
      {authenicationLinks.map((link, idx) => (
        <NextLink
          className={`${
            idx !== 0 ? "text-Black bg-White" : "text-White bg-Black"
          } border-Black border-solid border font-regular text-sm flex items-center ${authLinksName}`}
          href={link.href}
          key={link.href}
        >
          {link.text}
        </NextLink>
      ))}
    </div>
  );
};

const AuthenticationNav = ({
  classNames,
  authBtnClassNames,
  userProfClassNames,
}: {
  classNames?: string;
  authBtnClassNames?: RecursiveClassNames;
  userProfClassNames?: RecursiveClassNames;
}) => {
  const isLoggedIn: boolean = true;
  const windowWidth = useWindowWidth();
  const containerClassNames =
    "flex flex-col space-y-4 xs:space-0 xs:items-center xs:justify-end xs:h-full xs:flex-row xs:grow" +
    " " +
    (classNames ? classNames : "");
  return (
    <div className={containerClassNames}>
      {isLoggedIn ? (
        <UserProfileNav
          dropdown={windowWidth > 480}
          userProfClassNames={userProfClassNames}
        />
      ) : (
        <AuthenticationButtons authBtnClassNames={authBtnClassNames} />
      )}
    </div>
  );
};
export default AuthenticationNav;
