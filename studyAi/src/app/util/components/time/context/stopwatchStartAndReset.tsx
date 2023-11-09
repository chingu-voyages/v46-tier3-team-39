import { TimeStartAndResetProps } from "./useTimeContext";

const stopwatchStartAndReset = ({
  time,
  setPause,
  setTime,
  updateTimeAction,
  intervalRef,
  updateTimeActionIntervalRef,
  mounted,
}: TimeStartAndResetProps) => {
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
    if (updateTimeAction) updateTimeAction({ eventType: "reset", time: 0 });
  };
  return [startTimer, resetTimer];
};
export default stopwatchStartAndReset;