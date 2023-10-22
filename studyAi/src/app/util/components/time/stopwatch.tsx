"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import useTimeHook from "./hooks/useTimeHook";
import TimeControlsWrapper from "./timeControls";

const StopWatch = ({
  initialTimeUsed,
  updateTimeAction,
}: {
  updateTimeAction?: () => void;
  initialTimeUsed: number;
}) => {
  const {
    time,
    stopTimer,
    setTime,
    updateTimeActionIntervalRef,
    intervalRef,
    mounted,
    paused,
    setPause,
  } = useTimeHook({
    initialTime: initialTimeUsed,
    callback: (time) => {
      if (updateTimeAction) updateTimeAction();
    },
  });
  const startTimer = () => {
    setPause(false);
    intervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      setTime((prevTime) => {
        return prevTime + 1000;
      });
    }, 1000);
    updateTimeActionIntervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      //keep this slower occuring action in sync with locally changing one
      if (!intervalRef.current && updateTimeActionIntervalRef.current)
        clearInterval(updateTimeActionIntervalRef.current);
      //update below function with time value
      if (updateTimeAction) updateTimeAction();
    }, 5000);
  };
  const resetTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current)
      clearInterval(updateTimeActionIntervalRef.current);
    setTime(0);
  };
  return (
    <TimeControlsWrapper
      stopTimer={stopTimer}
      startTimer={startTimer}
      resetTimer={resetTimer}
      paused={paused}
    >
      <span>{formatMilliseconds(time)}</span>
    </TimeControlsWrapper>
  );
};

export default StopWatch;
