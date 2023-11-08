"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import useTimeHook, { TimeEventProps } from "./hooks/useTimeHook";
import TimeControlsWrapper from "./timeControls";
type StopWatchProps = {
  updateTimeAction?: (props?: TimeEventProps) => void;
  initialTimeUsed: number;
  autoPlay?: boolean;
};
const StopWatch = ({
  initialTimeUsed,
  updateTimeAction,
  autoPlay,
}: StopWatchProps) => {
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
    callback: (event) => {
      if (updateTimeAction) updateTimeAction(event);
    },
    autoPlay,
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
      if (updateTimeAction)
        updateTimeAction({
          eventType: "interval",
          time: time,
        });
    }, 5000);
    if (updateTimeAction) updateTimeAction({ eventType: "start", time: time });
  };
  const resetTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current)
      clearInterval(updateTimeActionIntervalRef.current);
    setTime(0);
    if (updateTimeAction)
      updateTimeAction({ eventType: "reset", time: 0 });
  };
  const timeArr = formatMilliseconds(time, true);
  return (
    <TimeControlsWrapper
      stopTimer={stopTimer}
      startTimer={startTimer}
      resetTimer={resetTimer}
      paused={paused}
      autoPlay={autoPlay}
    >
      <div
        className="flex justify-center items-center leading-none tracking-wider"
        style={{ lineHeight: 0 }}
        aria-label={formatMilliseconds(time) + " elapsed"}
      >
        {typeof timeArr === "string"
          ? timeArr
          : timeArr.map((e, idx) => (
              <div key={e + idx} className="mx-[0.03em]">
                {e}
              </div>
            ))}
      </div>
    </TimeControlsWrapper>
  );
};

export default StopWatch;
