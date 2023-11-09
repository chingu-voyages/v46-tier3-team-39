"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import { Button, IconButton, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TimeOptions } from "../../../../../../prisma/generated/type-graphql";
import TimeForm from "./timeForm";
import { unstable_batchedUpdates } from "react-dom";
import { TimeEventProps } from "@/app/util/components/time/hooks/useTimeHook";
import {
  getLocalStorageObj,
  deleteLocalStorageObj,
  addLocalStorageObj,
} from "@/app/util/parsers/localStorageWrappers";
//we can manage time on the frontend
//because time measurements are only
//for the user's benefit
//if we need to ensure compliance to time
//we must manage it using a websocket connection
type TimeProps = TimeOptions & {
  id?: string;
  initialTime: number;
};
const onChangeHandler =
  ({
    id,
    currType,
    setCurrInitTime,
    setTimerCompleteModalOpen,
  }: {
    id?: string;
    currType: string;
    setCurrInitTime: Dispatch<SetStateAction<number>>;
    setTimerCompleteModalOpen: Dispatch<SetStateAction<boolean>>;
  }) =>
  (e?: TimeEventProps) => {
    if (!e) return;
    const { eventType, time } = e;
    const dataId = id ? `${id}-time-data` : null;
    if (currType !== "stopwatch" && currType !== "timer") return;
    //if we're dealing with timer
    switch (eventType) {
      case "start":
        if (dataId)
          addLocalStorageObj(dataId, {
            time,
            timeType: currType,
          });
        break;
      case "interval":
        if (dataId)
          addLocalStorageObj(dataId, {
            time,
            timeType: currType,
          });
        break;
      case "stop":
        if (dataId)
          addLocalStorageObj(dataId, {
            time,
            timeType: currType,
          });
        break;
      case "reset":
        if (dataId) deleteLocalStorageObj(dataId);
        setCurrInitTime(0);
        break;
      case "finished":
        if (dataId) deleteLocalStorageObj(dataId);
        if (currType === "timer") setTimerCompleteModalOpen(true);
        break;
      default:
        return;
    }
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
        <StopWatch
          initialTimeUsed={currInitTime}
          autoPlay
          showTimer
          updateTimeAction={onChangeHandler({
            id,
            currType,
            setCurrInitTime,
            setTimerCompleteModalOpen,
          })}
          customBtns={
            <DeleteTimeBtn
              label={"remove-stopwatch"}
              setCurrTotalTimeGiven={setCurrTotalTimeGiven}
              setCurrType={setCurrType}
            />
          }
        />
      );
    case "timer":
      if (typeof currTotalTimeGiven === "number")
        return (
          <Timer
            initialTimeLeft={currTotalTimeGiven - currInitTime}
            totalTimeGiven={currTotalTimeGiven}
            showTimer
            autoPlay
            updateTimeAction={onChangeHandler({
              id,
              currType,
              setCurrInitTime,
              setTimerCompleteModalOpen,
            })}
            customBtns={
              <DeleteTimeBtn
                label={"remove-timer"}
                setCurrTotalTimeGiven={setCurrTotalTimeGiven}
                setCurrType={setCurrType}
              />
            }
          />
        );
      else {
        unstable_batchedUpdates(() => {
          setCurrTotalTimeGiven(null);
          setCurrType("stopwatch");
        });
        return <StopWatch initialTimeUsed={currInitTime} autoPlay />;
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
