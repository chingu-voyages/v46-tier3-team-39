"use client";
import { Avatar, Link, Menu, MenuItem } from "@mui/material";
import { UserInfo } from "../../../types/UserData";
import useElementPosition from "@/app/util/hooks/useElementSize";
import useDropdown from "@/app/util/hooks/useDropdown";
import useRemToPixel from "@/app/util/hooks/useRemToPixel";
import { LogoutBtn } from "./authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
const userItemLinks = (userId?: string) => [
  {
    href: `/dashboard`,
    text: "Dashboard",
    icon: <FontAwesomeIcon icon={faChartLine} className="aspect-square" />,
  },
  // {
  //   href: `/${userId}/exams`,
  //   text: "Your Exams",
  //   icon: <FontAwesomeIcon icon={faFileLines} className="aspect-square" />,
  // },
  // {
  //   href: `${userId}/profile`,
  //   text: "Profile",
  //   icon: <FontAwesomeIcon icon={faUserCircle} className="aspect-square" />,
  // },
];
const UserProfile = ({
  showUserInfo = false,
  name,
  email,
  image,
}: {
  showUserInfo?: boolean;
} & Partial<UserInfo>) => {
  const { setRef, position: infoPos } = useElementPosition();
  return (
    <div className="flex items-center h-full">
      <Avatar
        ref={setRef}
        className="bg-Black h-full aspect-square w-auto"
        src={image ? image : undefined}
        style={
          showUserInfo && infoPos?.height && infoPos.height > 0
            ? { height: infoPos.height }
            : undefined
        }
      >
        {name?.[0].toUpperCase()}
      </Avatar>
      {showUserInfo && (
        <div ref={setRef} className="flex flex-col w-full ml-4 py-1 space-y-0">
          <span className="text-Black font-bold tracking-tight text-lg">
            {name && name}
          </span>
          <span className="text-Black font-regular tracking-tight text-xs">
            {email}
          </span>
        </div>
      )}
    </div>
  );
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
      <MenuItem
        className="flex"
        style={{
          padding: 0,
        }}
      >
        <LogoutBtn
          className="flex tracking-tight justify-start text-sm w-full"
          icon
          sx={{
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        />
      </MenuItem>
    </Menu>
  );
};
// const determineUserProfStyles = (userProfClassNames?: RecursiveClassNames) => {
//   if (!userProfClassNames)
//     return { userProfClassName: null, userProfLinkClassName: null };
//   const userProf = userProfClassNames?.container as RecursiveClassNames;
//   const userProfClassName = userProf.value;
//   const userLinks = userProf.links as RecursiveClassNames;
//   const userProfLinkClassName = userLinks.value;
//   return { userProfClassName, userProfLinkClassName };
// };
export const UserProfileNav = ({
  // userProfClassNames,
  dropdown = true,
}: {
  dropdown?: boolean;
  // userProfClassNames?: RecursiveClassNames;
}) => {
  const session = useSession();
  const { setRef, position: userDropdownPos } = useElementPosition();
  const { anchorEl, handleClick, handleClose } = useDropdown();
  const userProfileProps = session.data?.user;
  if (!userProfileProps) return <></>;
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
      {!dropdown && (
        <div className="flex flex-col mt-10 space-y-4">
          {userItemLinks(userProfileProps.id).map((link) => (
            <NextLink
              key={link.text}
              href={link.href}
              className="text-Black font-regular flex items-center tracking-tight text-sm"
            >
              <span className="xs:ml-3">{link.text}</span>
            </NextLink>
          ))}
        </div>
      )}
    </>
  );
};
