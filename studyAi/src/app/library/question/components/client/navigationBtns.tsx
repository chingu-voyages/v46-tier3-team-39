"use client";
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export default function NavigationBtns() {
  const windowWidth = useWindowWidth();
  return (
    <div className="flex justify-between items-center w-full h-10 mt-2">
      <Button
        size={"large"}
        variant={"outlined"}
        className="flex justify-center items-center h-full font-semibold rounded-none"
        sx={{ textTransform: "none", minWidth: "unset" }}
        aria-label="Go to previous question"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
        {windowWidth > 480 && (
          <span className="flex items-center justify-center leading-none text-sm tracking-normal ml-3">
            Back
          </span>
        )}
      </Button>
      {/* <Timer initialTimeLeft={10000} totalTimeGiven={10000} /> */}
      <StopWatch initialTimeUsed={0} />
      <Button
        size={"large"}
        variant="outlined"
        className="flex justify-center items-center h-full font-semibold rounded-none"
        sx={{ textTransform: "none", minWidth: "unset" }}
        aria-label="Go to next question"
      >
        {windowWidth > 480 && (
          <span className="flex items-center justify-center leading-none text-sm tracking-normal">
            Next
          </span>
        )}
        <FontAwesomeIcon icon={faArrowRight} className="text-lg ml-3" />
      </Button>
    </div>
  );
}
