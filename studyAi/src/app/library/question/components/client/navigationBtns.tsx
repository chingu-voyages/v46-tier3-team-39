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
    <div className="flex justify-between items-center w-full h-10">
      <Button
        size={"medium"}
        variant={"outlined"}
        className="flex space-x-2 justify-center items-center h-full"
        sx={{ textTransform: "none", minWidth: "unset" }}
        aria-label="Go to previous question"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        {windowWidth > 480 && <span>Back</span>}
      </Button>
      {/* <Timer initialTimeLeft={10000} totalTimeGiven={10000} /> */}
      <StopWatch initialTimeUsed={0} />
      <Button
        size={"medium"}
        variant="outlined"
        className="flex space-x-2 justify-center items-center h-full"
        sx={{ textTransform: "none", minWidth: "unset" }}
        aria-label="Go to next question"
      >
        {windowWidth > 480 && <span>Next</span>}
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
}
