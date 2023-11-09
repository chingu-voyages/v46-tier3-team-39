"use client";
import { Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import {
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import TimerIcon from "../../icons/timerIcon";
import { MouseEvent, useEffect, useRef, useState } from "react";
type TimeControlsWrapper = {
  children: React.ReactNode;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
  paused: boolean;
  showTimer?: boolean;
  autoPlay?: boolean;
  customBtns?: React.ReactNode
}
const TimeControlsWrapper = ({
  children,
  paused,
  startTimer,
  resetTimer,
  stopTimer,
  showTimer,
  autoPlay,
  customBtns
}:TimeControlsWrapper) => {
  const [show, setShow] = useState(showTimer);
  const playAuto = useRef(autoPlay);
  useEffect(() => {
    if (playAuto.current) startTimer();
    //es-lint-disable-next-line
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
          paused && show
            ? showTimeVisibility(startTimer)
            : !paused && show
            ? showTimeVisibility(stopTimer)
            : !show
            ? () => setShow(true)
            : () => setShow(false)
        }
        sx={{ minWidth: "unset" }}
      >
        {!show && (
          <TimerIcon
            className={`${
              paused ? "fill-Black" : "fill-secondary-secondary35"
            } aspect-square text-lg svg-inline--fa`}
            height={"1em"}
            width={"1em"}
          />
        )}
        {paused && show && (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="aspect-square text-xl"
          />
        )}
        {!paused && show && (
          <FontAwesomeIcon
            icon={faCirclePause}
            className="aspect-square text-xl"
          />
        )}
      </IconButton>
      <IconButton
        size="large"
        type="button"
        onClick={resetTimer}
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
