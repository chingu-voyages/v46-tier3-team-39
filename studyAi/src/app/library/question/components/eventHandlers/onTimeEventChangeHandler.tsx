import { Dispatch, SetStateAction } from "react";
import { TimeEventProps } from "@/app/util/components/time/hooks/useTimeHook";
import {
  deleteLocalStorageObj,
  addLocalStorageObj,
} from "@/app/util/parsers/localStorageWrappers";
const onTimeEventChangeHandler =
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
export default onTimeEventChangeHandler