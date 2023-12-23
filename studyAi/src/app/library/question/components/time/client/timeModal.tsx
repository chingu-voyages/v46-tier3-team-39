"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { TimeOptions } from "../../../../../../../prisma/generated/type-graphql";
import TimeForm from "./timeForm";
import { unstable_batchedUpdates } from "react-dom";
import { getLocalStorageObj } from "@/app/util/parsers/localStorageWrappers";
import {
  TimeProvider,
  useTimeHook,
} from "@/app/util/components/time/context/useTimeContext";
import onTimeEventChangeHandler from "../../../eventHandlers/onTimeEventChangeHandler";
import ReadOnlyInput from "@/app/util/components/inputs/ReadOnlyInput";
import { createTimeStringFromMilliseconds } from "@/app/util/parsers/createTimeStringFromMilliseconds";
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
  //this creates the new total time string
  const parsedTimeElapsed = createTimeStringFromMilliseconds(totalTimeGiven);
  return (
    <Modal
      open={modalOpen}
      onClose={() => setTimerCompleteModalOpen(false)}
      aria-labelledby="timer-complete-modal"
      aria-describedby="timer-complete"
      className="flex justify-center items-center"
    >
      <div className="p-10 flex flex-col items-center space-y-4 bg-White text-Black min-w-[90%] md:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] max-h-[80%] overflow-y-auto">
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
const ReadOnlyTimeInput = () => {
  const timeContext = useTimeHook();
  if (!timeContext) return <></>;
  return (
    <ReadOnlyInput value={timeContext.time.toString()} name={"timeTaken"} />
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
  const readOnlyInputsArr = [
    <ReadOnlyTimeInput key="timeInputTime" />,
    <ReadOnlyInput
      key={"timeInputTimeType"}
      value={currType ? currType : "stopwatch"}
      name={"timeInputType"}
    />,
  ];
  if (typeof currTotalTimeGiven === "number")
    readOnlyInputsArr.push(
      <ReadOnlyInput
        key={"timeInputTotalTimeGiven"}
        value={currTotalTimeGiven.toString()}
        name={"totalTimeGiven"}
      />
    );
  useEffect(() => {
    setTimerCompleteModalOpen(false);
  }, [currType]);
  //update initial time with stored values
  useEffect(() => {
    const storedData = getLocalStorageObj<
      Pick<TimeProps, "initialTime" | "timeType">
    >(`${id}-timer-data`);
    if (storedData) setCurrInitTime(storedData.initialTime);
  }, [id]);
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
          {readOnlyInputsArr.map((val) => val)}
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
            {readOnlyInputsArr.map((val) => val)}
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
