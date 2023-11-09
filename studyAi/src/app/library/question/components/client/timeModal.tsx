"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TimeOptions } from "../../../../../../prisma/generated/type-graphql";
import TimeForm, { splitTimeStrBy2 } from "./timeForm";
import { unstable_batchedUpdates } from "react-dom";
import { getLocalStorageObj } from "@/app/util/parsers/localStorageWrappers";
import {
  TimeProvider,
  useTimeHook,
} from "@/app/util/components/time/context/useTimeContext";
import onTimeEventChangeHandler from "../eventHandlers/onTimeEventChangeHandler";
import formatMilliseconds from "@/app/util/parsers/formatMilliseconds";
import { timeLabelData } from "./timeForm";
import removeNonIntegerChars from "@/app/util/parsers/removeNonIntegerChars";
//we can manage time on the frontend
//because time measurements are only
//for the user's benefit
//if we need to ensure compliance to time
//we must manage it using a websocket connection
type TimeProps = TimeOptions & {
  id?: string;
  initialTime: number;
};
export const TimerFinishedModal = ({
  setTimerCompleteModalOpen,
  modalOpen,
  totalTimeGiven,
}: {
  totalTimeGiven: number;
  modalOpen: boolean;
  setTimerCompleteModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const timeContext = useTimeHook();
  const timeElapsed = formatMilliseconds(totalTimeGiven) as string;
  const timeStr = removeNonIntegerChars(timeElapsed);
  const timeArr = splitTimeStrBy2(timeStr);
  //this creates the new total time string
  const parsedTimeElapsed =
    timeArr.reduce(
      (a, b, idx) => a + timeLabelData[idx - 1].abbrev + " " + b
    ) + timeLabelData[timeLabelData.length - 1].abbrev;
  return (
    <Modal
      open={modalOpen}
      onClose={() => setTimerCompleteModalOpen(false)}
      aria-labelledby="timer-complete-modal"
      aria-describedby="timer-complete"
      className="flex justify-center items-center"
    >
      <div className="p-10 flex flex-col items-center space-y-4 bg-White text-Black">
        <Typography variant="h4">Your Time is Up!</Typography>
        <Typography variant="h6">Time Passed: {parsedTimeElapsed}</Typography>
        <Button
          size="large"
          type="button"
          aria-label="reset-timer"
          sx={{
            textTransform: "none",
          }}
          onClick={() => {
            setTimerCompleteModalOpen(false);
            if (timeContext) {
              //reset and start timer again
              timeContext.resetTimer();
              timeContext.startTimer();
            }
          }}
        >
          Start Over!
        </Button>
      </div>
    </Modal>
  );
};
export const DeleteTimeBtn = ({
  setCurrTotalTimeGiven,
  setCurrType,
  label,
}: {
  setCurrTotalTimeGiven: Dispatch<SetStateAction<number | null | undefined>>;
  setCurrType: Dispatch<SetStateAction<string | undefined>>;
  label: string;
}) => {
  return (
    <IconButton
      size="large"
      type="button"
      aria-label={label}
      sx={{ minWidth: "unset" }}
      className="flex justify-center items-center p-0 aspect-square h-[80%]"
      onClick={() => {
        unstable_batchedUpdates(() => {
          setCurrTotalTimeGiven(null);
          setCurrType(undefined);
        });
      }}
    >
      <FontAwesomeIcon icon={faTrash} className="text-lg" />
    </IconButton>
  );
};
export const TimeComponent = ({ props }: { props?: TimeProps }) => {
  const { timeType, initialTime, totalTimeGiven, id } = props || {
    initialTime: 0,
  };
  const [currType, setCurrType] = useState(timeType);
  const [currInitTime, setCurrInitTime] = useState(initialTime);
  const [currTotalTimeGiven, setCurrTotalTimeGiven] = useState(totalTimeGiven);
  const [modalOpen, setModalOpen] = useState(false);
  const [timerCompleteModalOpen, setTimerCompleteModalOpen] = useState(false);
  //every time we modify the time component we should ensure this is false
  //because that means that the timer has been added with new values, or
  //we no longer have a timer
  useEffect(() => {
    setTimerCompleteModalOpen(false);
  }, [currType]);
  //update initial time with stored values
  useEffect(() => {
    const storedData = getLocalStorageObj<
      Pick<TimeProps, "initialTime" | "timeType">
    >(`${id}-timer-data`);
    if (storedData) setCurrInitTime(storedData.initialTime);
  }, []);
  switch (currType) {
    case "stopwatch":
      return (
        <TimeProvider
          timeType="stopwatch"
          initialTime={currInitTime}
          autoPlay
          callback={onTimeEventChangeHandler({
            id,
            currType,
            setCurrInitTime,
            setTimerCompleteModalOpen,
          })}
        >
          <StopWatch
            showTimer
            customBtns={
              <DeleteTimeBtn
                label={"remove-stopwatch"}
                setCurrTotalTimeGiven={setCurrTotalTimeGiven}
                setCurrType={setCurrType}
              />
            }
          />
        </TimeProvider>
      );
    case "timer":
      if (typeof currTotalTimeGiven === "number")
        return (
          <TimeProvider
            timeType="timer"
            totalTimeGiven={currTotalTimeGiven}
            initialTime={currTotalTimeGiven - currInitTime}
            autoPlay
            callback={onTimeEventChangeHandler({
              id,
              currType,
              setCurrInitTime,
              setTimerCompleteModalOpen,
            })}
          >
            <Timer
              showTimer
              customBtns={
                <DeleteTimeBtn
                  label={"remove-timer"}
                  setCurrTotalTimeGiven={setCurrTotalTimeGiven}
                  setCurrType={setCurrType}
                />
              }
            />
            {timerCompleteModalOpen && (
              <TimerFinishedModal
                totalTimeGiven={currTotalTimeGiven}
                modalOpen={timerCompleteModalOpen}
                setTimerCompleteModalOpen={setTimerCompleteModalOpen}
              />
            )}
          </TimeProvider>
        );
      else {
        unstable_batchedUpdates(() => {
          setCurrTotalTimeGiven(null);
          setCurrType("stopwatch");
        });
        return (
          <TimeProvider
            timeType="stopwatch"
            initialTime={currInitTime}
            autoPlay
            callback={onTimeEventChangeHandler({
              id,
              currType,
              setCurrInitTime,
              setTimerCompleteModalOpen,
            })}
          >
            <StopWatch
              showTimer
              customBtns={
                <DeleteTimeBtn
                  label={"remove-stopwatch"}
                  setCurrTotalTimeGiven={setCurrTotalTimeGiven}
                  setCurrType={setCurrType}
                />
              }
            />
          </TimeProvider>
        );
      }
    //create timer component
    default:
      return (
        <>
          {!modalOpen && (
            <Button
              type="button"
              onClick={() => setModalOpen(true)}
              className="h-full"
              sx={{ textTransform: "unset", minHeight: "unset" }}
              aria-label="open-modal-to-attach-stopwatch-or-timer"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="ml-1">Add Time</span>
            </Button>
          )}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="track-your-time"
            aria-describedby="attach-stopwatch-or-timer"
            className="flex justify-center items-center"
          >
            <>
              <TimeForm
                setCurrType={setCurrType}
                setCurrTotalTimeGiven={setCurrTotalTimeGiven}
                setModalOpen={setModalOpen}
              />
            </>
          </Modal>
        </>
      );
  }
};
