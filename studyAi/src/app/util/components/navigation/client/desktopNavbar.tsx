"use client";
import React from "react";
import { MenuItem, Menu, Link } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import useRemToPixel from "@/app/util/hooks/useRemToPixel";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons/faWandMagicSparkles";
import useDropdown from "@/app/util/hooks/useDropdown";
import { unstable_batchedUpdates } from "react-dom";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const menuItemLinks = [
  {
    id: "create-question",
    href: "/",
    text: "Create Question",
    onClick:
      (router: AppRouterInstance) =>
      (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        router.push("/dashboard/createQuestion");
      },
    icon: (
      <FontAwesomeIcon icon={faWandMagicSparkles} className="aspect-square" />
    ),
  },
  // {
  //   id: "create-exam",
  //   href: "/",
  //   text: "Create Exam",
  //   icon: <FontAwesomeIcon icon={faFileLines} className="aspect-square" />,
  // }
];

export const GenerateDropdown = () => {
  const currRemToPixelVal = useRemToPixel("1rem");
  const { setRef, position: dropdownButtonPos } = useElementPosition();
  const { anchorEl, setAnchorEl, handleClick, handleClose, open } =
    useDropdown();
  const router = useRouter();
  return (
    <div className="relative flex items-center m-0 p-0">
      <Link
        ref={(ref) => {
          unstable_batchedUpdates(() => {
            setRef(ref);
            setAnchorEl(ref);
          });
        }}
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
        open={open}
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
              if (link.onClick) {
                if (link.id === "create-question") link.onClick(router)(e);
                else {
                  const clickFunc = link.onClick as any;
                  clickFunc(e);
                }
              }
              handleClose();
            }}
          >
            {link.id === "create-question" && (
              <>
                {link.icon && link.icon}
                <span className="ml-3">{link.text}</span>
              </>
            )}

          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
