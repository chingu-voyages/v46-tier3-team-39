"use client";
import { useEffect, useRef, useState } from "react";
const useTimeHook = ({
  initialTime,
  callback,
}: {
  initialTime: number;
  callback?: (time: number) => void;
}) => {
  const [time, setTime] = useState(initialTime);
  const [paused, setPause] = useState(true);
  const updateTimeActionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mounted = useRef(true);
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
  const stopTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current) {
      //update with curr time value
      if (callback) callback(time);
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
