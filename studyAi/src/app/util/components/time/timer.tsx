//we store state in react-sweet state
"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import useTimeHook from "./hooks/useTimeHook";
import TimeControlsWrapper from "./timeControls";

const Timer = ({
  initialTimeLeft,
  updateTimeAction,
  totalTimeGiven,
}: {
  updateTimeAction?: () => void;
  initialTimeLeft: number;
  totalTimeGiven?: number;
}) => {
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
    callback: (time) => {
      if (updateTimeAction) updateTimeAction();
    },
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
        if (updateTimeAction) updateTimeAction();
      },
      //we update every 5 second to local state (as updating local storage is a costly computation due to stringification)
      initialTimeLeft < 5000 ? initialTimeLeft : 5000
    );
  };
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (updateTimeActionIntervalRef.current)
      clearInterval(updateTimeActionIntervalRef.current);
    setTime(totalTimeGiven ? totalTimeGiven : 100000);
  };
  const timeArr = formatMilliseconds(time, true);
  return (
    <div className="flex items-center justify-center h-full space-x-1">
      <TimeControlsWrapper
        stopTimer={stopTimer}
        startTimer={startTimer}
        resetTimer={resetTimer}
        paused={paused}
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
