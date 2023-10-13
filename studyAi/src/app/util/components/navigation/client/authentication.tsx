"use client";
import NextLink from "next/link";
import { Avatar, Link, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { UserInfo } from "../../../types/UserData";
import useElementPosition from "@/app/util/hooks/useElementSize";
import useDropdown from "@/app/util/hooks/useDropdown";
import useRemToPixel from "@/app/util/hooks/useRemToPixel";
import { faFileLines, faUserCircle } from "@fortawesome/free-regular-svg-icons";
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
const userItemLinks = (userId?: string) => [
  {
    href: `/dashboard`,
    text: "Dashboard",
    icon: <FontAwesomeIcon icon={faChartLine} className="aspect-square" />,
  },
  {
    href: `/${userId}/exams`,
    text: "Your Exams",
    onClick: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => {},
    icon: <FontAwesomeIcon icon={faFileLines} className="aspect-square" />,
  },
  {
    href: `${userId}/profile`,
    text: "Profile",
    icon: <FontAwesomeIcon icon={faUserCircle} className="aspect-square" />,
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
  first_name,
  last_name,
  email,
}: {
  showUserInfo?: boolean;
  onClick?: () => void;
} & Partial<UserInfo>) => {
  const { setRef, position: avatarPos } = useElementPosition();
  return (
    <div className="flex items-center h-full">
      <Avatar
        ref={setRef}
        className="bg-Black h-full aspect-square w-auto"
        style={
          avatarPos?.width && avatarPos.width > 0
            ? { width: avatarPos?.width }
            : undefined
        }
      >
        {first_name?.[0].toUpperCase()}
      </Avatar>
      {showUserInfo && (
        <div className="flex flex-col w-full mr-4">
          <span className="text-Black font-regular tracking-tight text-sm mb-2">
            {first_name && last_name && first_name + " " + last_name}
          </span>
          <span className="text-Black font-regular tracking-tight text-sm">
            {email}
          </span>
        </div>
      )}
    </div>
  );
};
const UserProfileDropdown = () => {
  const currRemToPixelVal = useRemToPixel("1rem");
  const { setRef, position: userDropdownPos } = useElementPosition();
  const { anchorEl, handleClick, handleClose } = useDropdown();
  const isLoggedIn: boolean = true;
  const userProfileProps: Partial<UserInfo> & {
    showUserInfo: boolean;
  } = {
    showUserInfo: false,
    email: "arkyasmal@gmail.com",
    first_name: "Arky",
    last_name: "Asmal",
    id: "XXXXXXXXXXXXXXXXXXX",
  };
  return (
    <>
      <Link
        ref={setRef}
        className="flex items-center h-5/6"
        component={"button"}
        aria-label="open-user-navigation"
        style={{ textDecoration: "none" }}
        onClick={handleClick}
      >
        <UserProfile {...userProfileProps} />
        <FontAwesomeIcon className={"text-Black ml-2"} icon={faCaretDown} />
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
                left: userDropdownPos.x + userDropdownPos.width,
              }
            : undefined
        }
        onClose={handleClose}
      >
        {userItemLinks(userProfileProps.id).map((link) => (
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
    </>
  );
};
const AuthenticationNav = () => {
  const isLoggedIn: boolean = true;
  return (
    <div className="grow flex items-center justify-end h-full">
      {isLoggedIn ? <UserProfileDropdown /> : <AuthenticationButtons />}
    </div>
  );
};
export default AuthenticationNav;
