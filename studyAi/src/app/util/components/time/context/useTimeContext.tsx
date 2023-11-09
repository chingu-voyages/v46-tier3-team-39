"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import timerStartAndReset from "./timerStartAndReset";
import stopwatchStartAndReset from "./stopwatchStartAndReset";

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
  updateTimeAction?: (props?: TimeEventProps) => void;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  updateTimeActionIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
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
  updateTimeActionIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
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
  const updateTimeActionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mounted = useRef(true);
  //every context is re-rendered clear the interval and restart it
  useEffect(() => {
    mounted.current = true;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (updateTimeActionIntervalRef.current)
        clearInterval(updateTimeActionIntervalRef.current);
      mounted.current = false;
    };
  }, []);
  //every time timeType changes, clear the interval and restart it
  useEffect(() => {
    mounted.current = true;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (updateTimeActionIntervalRef.current)
        clearInterval(updateTimeActionIntervalRef.current);
      mounted.current = false;
      };
  }, [timeType]);
  const stopTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current) {
      if (callback) {
        callback({
          eventType: "stop",
          time: time,
        });
      }
      clearInterval(updateTimeActionIntervalRef.current);
    }
  };
  const [startTimer, resetTimer] =
    timeType === "timer"
      ? timerStartAndReset({
          time,
          initialTimeLeft: initialTime,
          setPause,
          setTime,
          updateTimeAction: callback,
          intervalRef,
          updateTimeActionIntervalRef,
          mounted,
          totalTimeGiven,
        })
      : stopwatchStartAndReset({
          time,
          setPause,
          setTime,
          updateTimeAction: callback,
          intervalRef,
          updateTimeActionIntervalRef,
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
    updateTimeActionIntervalRef,
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
