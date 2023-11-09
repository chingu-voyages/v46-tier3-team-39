"use client";
import { useEffect, useRef, useState } from "react";

export type TimeEventProps = {
  time: number;
  eventType: "start" | "stop" | "reset" | "interval" | "finished";
};
const useTimeHook = ({
  initialTime,
  callback,
  autoPlay,
}: {
  initialTime: number;
  callback?: (props?: TimeEventProps) => void;
  autoPlay?: boolean;
}) => {
  const playAuto = useRef(autoPlay);
  const [time, setTime] = useState(initialTime);
  const [paused, setPause] = useState(true);
  const updateTimeActionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mounted = useRef(true);
  // useEffect(() => {
  //   setTime(initialTime);
  // }, [initialTime]);
  useEffect(() => {
    mounted.current = true;
    //clean up any side effects so we dont cause a memory leak
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (updateTimeActionIntervalRef.current)
        clearInterval(updateTimeActionIntervalRef.current);
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (playAuto.current)
      setPause((state) => {
        if (state) return false;
        else return state;
      });
  }, []);
  const stopTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current) {
      //update with curr time value
      if (callback)
        callback({
          eventType: "stop",
          time: time,
        });
      clearInterval(updateTimeActionIntervalRef.current);
    }
  };
  return {
    time,
    paused,
    setPause,
    stopTimer,
    setTime,
    updateTimeActionIntervalRef,
    intervalRef,
    mounted,
  };
};
export default useTimeHook;
