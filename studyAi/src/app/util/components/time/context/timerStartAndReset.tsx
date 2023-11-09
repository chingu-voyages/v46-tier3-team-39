import { unstable_batchedUpdates } from "react-dom";
import { TimeStartAndResetProps } from "./useTimeContext";

const timerStartAndReset = ({
  time,
  initialTimeLeft,
  totalTimeGiven,
  setPause,
  setTime,
  updateTimeAction,
  intervalRef,
  updateTimeActionIntervalRef,
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
  return [startTimer, resetTimer];
};
export default timerStartAndReset