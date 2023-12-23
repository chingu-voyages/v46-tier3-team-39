"use client";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { MouseEvent } from "react";
import { TimeComponent } from "../../time/client/timeModal";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import { useFullscreen } from "@/app/util/providers/FullscreenProvider";
export type PaginationOptions = {
  onPrev: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onNext: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
};
export function QuestionNavigationBtns({
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
export const OngoingQuestionBar = ({
  pagination,
}: {
  pagination?: PaginationOptions;
}) => {
  if (pagination)
    return (
      <QuestionNavigationBtns pagination={pagination}>
        <TimeComponent />
      </QuestionNavigationBtns>
    );
  return (
    <div className="h-10 mt-1">
      <TimeComponent />
    </div>
  );
};
export const QuestionPageNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isFullscreen } = useFullscreen();
  return (
    <ConditionalWrapper
      condition={!isFullscreen}
      wrapper={(children: React.ReactNode) => (
        <NavigationWrapper
          usePadding
          appBars={{
            footer: false,
            navbar: true,
          }}
        >
          {children}
        </NavigationWrapper>
      )}
    >
      <ConditionalWrapper
        condition={isFullscreen}
        wrapper={(children: React.ReactNode) => (
          <div className="flex flex-col min-h-screen bg-White text-Black px-[5%] py-[2%]">
            {children}
          </div>
        )}
      >
        {children}
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
};
export default QuestionPageNavigation