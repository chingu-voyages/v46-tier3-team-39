import { unstable_batchedUpdates } from "react-dom";
import { TimeStartAndResetProps } from "./useTimeContext";
const timerStartAndReset = ({
  time,
  initialTimeLeft,
  totalTimeGiven,
  setPause,
  setTime,
  callback,
  intervalRef,
  callbackIntervalRef,
  mounted,
}: TimeStartAndResetProps) => {
  const startTimer = () => {
    setPause(false);
    //we change local state every second, as a balance between performance and accuracy
    intervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      setTime((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime > 0) return newTime;
        if (newTime <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return 0;
      });
    }, 1000);
    callbackIntervalRef.current = setInterval(
      () => {
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
      },
      //we update every 5 second as this can be costly computation (i.e writing to local state)
      initialTimeLeft < 5000 ? initialTimeLeft : 5000
    );
    if (callback) callback({ eventType: "start", time: time });
  };
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (callbackIntervalRef.current)
      clearInterval(callbackIntervalRef.current);
    const newTime = totalTimeGiven ? totalTimeGiven : 0;
    unstable_batchedUpdates(() => {
      setTime(newTime);
      setPause(true);
      if (callback)
        callback({ eventType: "reset", time: newTime });
    });
  };
  return [startTimer, resetTimer];
};
export default timerStartAndReset;