"use client";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { MouseEvent } from "react";
export type PaginationOptions = {
  onPrev: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onNext: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};
export function NavigationBtns({
  children,
  pagination,
}: {
  pagination: PaginationOptions;
  children: React.ReactNode;
}) {
  const windowWidth = useWindowWidth();
  const btnClassNames =
    "flex justify-center items-center h-full font-semibold rounded-none";
  const btnStyles = {
    textTransform: "none",
    minWidth: "unset",
  };
  return (
    <div className="flex justify-between items-center w-full h-10 mt-1">
      <Button
        type="button"
        size={"large"}
        variant={"outlined"}
        className={btnClassNames}
        sx={btnStyles}
        aria-label="Go to previous question"
        onClick={pagination.onPrev}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
        {windowWidth > 480 && (
          <span className="flex items-center justify-center leading-none text-sm tracking-normal ml-2">
            Back
          </span>
        )}
      </Button>
      {children}
      <Button
        type="button"
        size={"large"}
        variant="outlined"
        className={btnClassNames}
        sx={btnStyles}
        aria-label="Go to next question"
        onClick={pagination.onNext}
      >
        {windowWidth > 480 && (
          <span className="flex items-center justify-center leading-none text-sm tracking-normal">
            Next
          </span>
        )}
        <FontAwesomeIcon icon={faArrowRight} className="text-sm ml-2" />
      </Button>
    </div>
  );
}
