"use client";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons/faCirclePause";
import TimerIcon from "../../icons/timerIcon";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useTimeHook } from "./context/useTimeContext";
type TimeControlsWrapper = {
  children: React.ReactNode;
  showTimer?: boolean;
  customBtns?: React.ReactNode;
};
const TimeControlsWrapper = ({
  children,
  showTimer,
  customBtns,
}: TimeControlsWrapper) => {
  const timeContext = useTimeHook();
  const [show, setShow] = useState(showTimer);
  const playAuto = useRef(timeContext && timeContext.autoPlay);
  useEffect(() => {
    if (playAuto.current && timeContext) timeContext.startTimer();
    //eslint-disable-next-line
  }, []);

  const showTimeVisibility =
    (callback?: () => void) =>
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      if (callback) callback();
      setShow(true);
    };
  return (
    <div className="flex items-center justify-center h-full w-full">
      {show && (
        <div className="flex justify-center items-center h-full">
          <Button
            type="button"
            onClick={() => setShow(false)}
            className="flex items-center px-1 py-2 text-Black h-[80%] font-medium text-base break-words"
            sx={{
              minWidth: "unset",
              minHeight: "unset",
            }}
          >
            {children}
          </Button>
        </div>
      )}
      <IconButton
        type="button"
        size="large"
        className="flex justify-center items-center p-0 aspect-square h-[80%]"
        onClick={
          timeContext && timeContext.paused && show
            ? showTimeVisibility(timeContext.startTimer)
            : timeContext && !timeContext.paused && show
            ? showTimeVisibility(timeContext.stopTimer)
            : !show
            ? () => setShow(true)
            : () => setShow(false)
        }
        sx={{ minWidth: "unset" }}
      >
        {!show && (
          <TimerIcon
            className={`${
              timeContext && timeContext.paused
                ? "fill-Black"
                : "fill-secondary-secondary35"
            } aspect-square text-lg svg-inline--fa`}
            height={"1em"}
            width={"1em"}
          />
        )}
        {timeContext && timeContext.paused && show && (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="aspect-square text-xl"
          />
        )}
        {timeContext && !timeContext.paused && show && (
          <FontAwesomeIcon
            icon={faCirclePause}
            className="aspect-square text-xl"
          />
        )}
      </IconButton>
      <IconButton
        size="large"
        type="button"
        onClick={timeContext ? timeContext.resetTimer : undefined}
        className="flex justify-center items-center p-0 aspect-square h-[80%]"
        sx={{ minWidth: "unset" }}
      >
        <FontAwesomeIcon icon={faArrowsRotate} className="text-lg" />
      </IconButton>
      {customBtns}
    </div>
  );
};
export default TimeControlsWrapper;
