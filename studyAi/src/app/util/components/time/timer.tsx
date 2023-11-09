//we store state in react-sweet state
"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import useTimeHook from "./hooks/useTimeHook";
import TimeControlsWrapper from "./timeControls";
import { TimeEventProps } from "./hooks/useTimeHook";
import { unstable_batchedUpdates } from "react-dom";
type TimerProps = {
  updateTimeAction?: (props?: TimeEventProps) => void;
  initialTimeLeft: number;
  totalTimeGiven?: number | null;
  showTimer?: boolean;
  autoPlay?: boolean;
  customBtns?: React.ReactNode;
};
const Timer = ({
  initialTimeLeft,
  updateTimeAction,
  totalTimeGiven,
  showTimer,
  autoPlay,
  customBtns
}: TimerProps) => {
  const {
    time,
    stopTimer,
    setTime,
    updateTimeActionIntervalRef,
    intervalRef,
    mounted,
    setPause,
    paused,
  } = useTimeHook({
    initialTime: initialTimeLeft,
    callback: (props?: TimeEventProps) => {
      if (updateTimeAction) updateTimeAction(props);
    },
    autoPlay,
  });
  const startTimer = () => {
    setPause(false);
    //we change local state every second, as a balance between performance and accuracy
    intervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      setTime((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime > 0) return newTime;
        if (newTime <= 0 && intervalRef.current) {
          setPause(true);
          if (updateTimeAction)
            updateTimeAction({
              eventType: "finished",
              time: 0,
            });
          clearInterval(intervalRef.current);
        }
        return 0;
      });
    }, 1000);
    updateTimeActionIntervalRef.current = setInterval(
      () => {
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
      },
      //we update every 5 second to local state (as updating local storage is a costly computation due to stringification)
      initialTimeLeft < 5000 ? initialTimeLeft : 5000
    );
    if (updateTimeAction) updateTimeAction({ eventType: "start", time: time });
  };
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current)
      clearInterval(updateTimeActionIntervalRef.current);
    const newTime = totalTimeGiven ? totalTimeGiven : 0;
    unstable_batchedUpdates(() => {
      setTime(newTime);
      setPause(true);
      if (updateTimeAction)
        updateTimeAction({ eventType: "reset", time: newTime });
    });
  };
  const timeArr = formatMilliseconds(time, true);
  return (
    <div className="flex items-center justify-center h-full space-x-1">
      <TimeControlsWrapper
        stopTimer={stopTimer}
        startTimer={startTimer}
        resetTimer={resetTimer}
        paused={paused}
        showTimer={showTimer}
        autoPlay={autoPlay}
        customBtns={customBtns}
      >
        <div
          className="flex justify-center items-center leading-none"
          style={{ lineHeight: 0 }}
          aria-label={formatMilliseconds(time) + " remaining"}
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
    </div>
  );
};

export default Timer;
