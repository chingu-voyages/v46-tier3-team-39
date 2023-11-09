import { TimeStartAndResetProps } from "./useTimeContext";

const stopwatchStartAndReset = ({
  time,
  setPause,
  setTime,
  callback,
  intervalRef,
  callbackIntervalRef,
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
    callbackIntervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      //keep this slower occuring action in sync with locally changing one
      if (!intervalRef.current && callbackIntervalRef.current)
        clearInterval(callbackIntervalRef.current);
      //update below function with time value
      if (callback)
        callback({
          eventType: "interval",
          time: time,
        });
    }, 5000);
    if (callback) callback({ eventType: "start", time: time });
  };
  const resetTimer = () => {
    setPause(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (callbackIntervalRef.current)
      clearInterval(callbackIntervalRef.current);
    setTime(0);
    if (callback) callback({ eventType: "reset", time: 0 });
  };
  return [startTimer, resetTimer];
};
export default stopwatchStartAndReset;