"use client";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { UserProfileNav } from "@/app/util/components/navigation/client/userProfile";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonProps } from "@mui/material";
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
            idx !== 0 ? "text-Black bg-White" : "text-Black"
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
export const LogoutBtn = (
  props: {
    icon?: boolean;
  } & ButtonProps
) => {
  const className = props.className;
  const classStyles =
    (className ? className : "") + "flex w-full [&>*]:rounded-none";
  const domProps = { ...props };
  delete domProps.icon;
  const newProps: ButtonProps = {
    ...domProps,
    className: classStyles,
    sx: props.sx ? props.sx : {},
  };
  const onLogout = () =>
    signOut({
      callbackUrl: "/auth/login",
    });
  return (
    <Button
      {...newProps}
      aria-label="sign-out"
      onClick={onLogout}
      sx={{
        textTransform: "none",
        ...newProps.sx,
      }}
    >
      {props.icon && (
        <FontAwesomeIcon
          className={"aspect-square xs:mr-3"}
          icon={faRightFromBracket}
        />
      )}
      Sign Out
    </Button>
  );
};
const AuthenticationNav = ({
  classNames,
  authBtnClassNames,
}: // userProfClassNames,
{
  classNames?: string;
  authBtnClassNames?: RecursiveClassNames;
  // userProfClassNames?: RecursiveClassNames;
}) => {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const windowWidth = useWindowWidth();
  const containerClassNames =
    "flex flex-col xs:items-center xs:justify-end xs:h-full xs:flex-row xs:grow" +
    " " +
    (classNames ? classNames : "");
  return (
    <div className={containerClassNames}>
      {isLoggedIn ? (
        <UserProfileNav
          dropdown={windowWidth > 480}
          // userProfClassNames={userProfClassNames}
        />
      ) : (
        <AuthenticationButtons authBtnClassNames={authBtnClassNames} />
      )}
    </div>
  );
};
export default AuthenticationNav;
