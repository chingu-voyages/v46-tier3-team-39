"use client";
import { Avatar, Link, Menu, MenuItem } from "@mui/material";
import { UserInfo } from "../../../types/UserData";
import useElementPosition from "@/app/util/hooks/useElementSize";
import useDropdown from "@/app/util/hooks/useDropdown";
import useRemToPixel from "@/app/util/hooks/useRemToPixel";
import { RecursiveClassNames } from "./authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import NextLink from "next/link";
const userItemLinks = (userId?: string) => [
  {
    href: `/dashboard`,
    text: "Dashboard",
    icon: <FontAwesomeIcon icon={faChartLine} className="aspect-square" />,
  },
  {
    href: `/${userId}/exams`,
    text: "Your Exams",
    icon: <FontAwesomeIcon icon={faFileLines} className="aspect-square" />,
  },
  {
    href: `${userId}/profile`,
    text: "Profile",
    icon: <FontAwesomeIcon icon={faUserCircle} className="aspect-square" />,
  },
];
const UserProfile = ({
  showUserInfo = false,
  first_name,
  last_name,
  email,
}: {
  showUserInfo?: boolean;
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
        <div className="flex flex-col w-full ml-4 py-1 space-y-0">
          <span className="text-Black font-bold tracking-tight text-lg">
            {first_name && last_name && first_name + " " + last_name}
          </span>
          <span className="text-Black font-regular tracking-tight text-xs">
            {email}
          </span>
        </div>
      )}
    </div>
  );
};
const determineUserProfStyles = (userProfClassNames?: RecursiveClassNames) => {
  if (!userProfClassNames)
    return { authContainerClassName: null, authLinkName: null };
  const userProf = userProfClassNames?.container as RecursiveClassNames;
  const userProfClassName = userProf.value;
  const authLink = userProf.links as RecursiveClassNames;
  const authLinkName = authLink.value;
  return { userProfClassName, authLinkName };
};
export const ProfileDropdown = ({
  anchorEl,
  userDropdownPos,
  handleClose,
  userId,
}: {
  anchorEl: HTMLElement | null;
  userDropdownPos: { x: number; y: number; width: number; height: number };
  handleClose: () => void;
  userId: Partial<UserInfo>["id"];
}) => {
  const currRemToPixelVal = useRemToPixel("1rem");
  return (
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
      {userItemLinks(userId).map((link) => (
        <MenuItem
          key={link.text}
          href={link.href}
          className="text-Black font-regular flex items-center tracking-tight text-sm"
          onClick={(e) => {
            // if (link.onClick) link.onClick(e);
            handleClose();
          }}
        >
          <NextLink
            key={link.text}
            href={link.href}
            className="text-Black font-regular flex items-center tracking-tight text-sm"
          >
            {link.icon && link.icon}
            <span className="xs:ml-3">{link.text}</span>
          </NextLink>
        </MenuItem>
      ))}
    </Menu>
  );
};
export const UserProfileNav = ({
  userProfClassNames,
  dropdown = true,
}: {
  dropdown?: boolean;
  userProfClassNames?: RecursiveClassNames;
}) => {
  const { setRef, position: userDropdownPos } = useElementPosition();
  const { anchorEl, handleClick, handleClose } = useDropdown();
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
      {dropdown && (
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
      )}

      {dropdown && (
        <ProfileDropdown
          anchorEl={anchorEl}
          userDropdownPos={userDropdownPos}
          handleClose={handleClose}
          userId={userProfileProps.id}
        />
      )}
      {!dropdown && <UserProfile {...userProfileProps} showUserInfo />}
      {!dropdown &&
        userItemLinks(userProfileProps.id).map((link) => (
          <NextLink
            key={link.text}
            href={link.href}
            className="text-Black font-regular flex items-center tracking-tight text-sm"
          >
            <span className="xs:ml-3">{link.text}</span>
          </NextLink>
        ))}
    </>
  );
};