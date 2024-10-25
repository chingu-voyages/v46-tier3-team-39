"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import timerStartAndReset from "./timerStartAndReset";
import stopwatchStartAndReset from "./stopwatchStartAndReset";
import { unstable_batchedUpdates } from "react-dom";
export type TimeEventProps = {
  time: number;
  eventType: "start" | "stop" | "reset" | "interval" | "finished";
};
export type TimeStartAndResetProps = {
  time: number;
  initialTimeLeft: number;
  totalTimeGiven?: number | null;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  callback?: (props?: TimeEventProps) => void;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  callbackIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  mounted: React.MutableRefObject<boolean>;
};
export type TimeContextProps = {
  time: number;
  paused: boolean;
  autoPlay: boolean | undefined;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  callbackIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  mounted: React.MutableRefObject<boolean>;
};
// Create a new context
const TimeContext = React.createContext<TimeContextProps | null>(null);
// Create a provider component
const TimeProvider = ({
  initialTime,
  callback,
  autoPlay,
  children,
  timeType,
  totalTimeGiven,
}: {
  timeType: "stopwatch" | "timer";
  initialTime: number;
  callback?: (props?: TimeEventProps) => void;
  autoPlay?: boolean;
  children: React.ReactNode;
  totalTimeGiven?: number | null;
}) => {
  const [time, setTime] = useState(initialTime);
  const [paused, setPause] = useState(true);
  const callbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mounted = useRef(true);
  //every context is re-rendered clear the interval and restart it
  useEffect(() => {
    mounted.current = true;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (callbackIntervalRef.current)
        clearInterval(callbackIntervalRef.current);
      mounted.current = false;
    };
  }, []);
  //handle timer side effects, by reseting time
  //if timer has ended. This is a non-issue on stopwatch
  useEffect(() => {
    if (timeType !== "timer") return;
    if (!paused && time <= 0 && intervalRef.current) {
      if (callback)
        callback({
          eventType: "finished",
          time: 0,
        });
      unstable_batchedUpdates(() => {
        setPause(true);
        if (totalTimeGiven) setTime(totalTimeGiven);
      });
    }
  }, [paused, timeType, time, totalTimeGiven, callback]);
  //every time timeType changes, clear the interval and restart it
  useEffect(() => {
    mounted.current = true;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (callbackIntervalRef.current)
        clearInterval(callbackIntervalRef.current);
      mounted.current = false;
    };
  }, [timeType]);
  const stopTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (callbackIntervalRef.current) {
      if (callback) {
        callback({
          eventType: "stop",
          time: time,
        });
      }
      clearInterval(callbackIntervalRef.current);
    }
  };
  const [startTimer, resetTimer] =
    timeType === "timer"
      ? timerStartAndReset({
          time,
          initialTimeLeft: initialTime,
          setPause,
          setTime,
          callback: callback,
          intervalRef,
          callbackIntervalRef,
          mounted,
          totalTimeGiven,
        })
      : stopwatchStartAndReset({
          time,
          setPause,
          setTime,
          callback: callback,
          intervalRef,
          callbackIntervalRef,
          mounted,
          initialTimeLeft: initialTime,
        });
  const value = {
    time,
    paused,
    autoPlay,
    setPause,
    startTimer,
    resetTimer,
    stopTimer,
    setTime,
    callbackIntervalRef,
    intervalRef,
    mounted,
  };
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

// Custom hook to consume the context value
const useTimeHook = () => {
  return useContext(TimeContext);
};

export { TimeProvider, useTimeHook };
