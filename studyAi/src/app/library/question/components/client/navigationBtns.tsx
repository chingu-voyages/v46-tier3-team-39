"use client";

import Timer from "@/app/util/components/time/timer";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export default function NavigationBtns() {
  return (
    <div className="flex justify-between items-center w-full h-10">
      <Button
        size={"medium"}
        variant={"outlined"}
        className="flex space-x-2 justify-center items-center h-full"
        sx={{ textTransform: "none" }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />

        <span>Back</span>
      </Button>
      <Timer initialTimeLeft={10000} totalTimeGiven={10000} />
      <Button
        size={"medium"}
        variant="outlined"
        className="flex space-x-2 justify-center items-center h-full"
        sx={{ textTransform: "none" }}
      >
        <span>Next</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
}
