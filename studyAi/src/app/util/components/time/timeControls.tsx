"use client";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons";
import TimerIcon from "../../icons/timerIcon";
const TimeControlsWrapper = ({
  children,
  paused,
  startTimer,
  resetTimer,
  stopTimer,
}: {
  children: React.ReactNode;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
  paused: boolean;
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Button
        size="medium"
        variant="text"
        className="flex justify-center items-center px-2 text-Black h-full"
        onClick={paused ? startTimer : stopTimer}
        sx={{ minWidth: "unset" }}
      >
        {paused && (
          <TimerIcon
            className="fill-Black aspect-square text-lg svg-inline--fa mr-1"
            height={"1em"}
            width={"1em"}
          />
        )}
        {!paused && (
          <FontAwesomeIcon
            icon={faCirclePause}
            className="aspect-square text-lg mr-1"
          />
        )}
        {children}
      </Button>
      <Button
        size="large"
        variant="text"
        onClick={resetTimer}
        className="flex justify-center items-center p-0 aspect-square h-full"
        sx={{ minWidth: "unset" }}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </Button>
    </div>
  );
};
export default TimeControlsWrapper;
