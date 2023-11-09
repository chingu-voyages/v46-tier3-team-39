//we store state in react-sweet state
"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import { useTimeHook } from "./context/useTimeContext";
import TimeControlsWrapper from "./timeControls";
type TimerProps = {
  showTimer?: boolean;
  customBtns?: React.ReactNode;
};
const Timer = ({
  showTimer,
  customBtns,
}: TimerProps) => {
  const timeContext = useTimeHook();
  if (!timeContext) return <></>
  const {
    time,
  } = timeContext;
  const timeArr = formatMilliseconds(time, true);
  return (
    <div className="flex items-center justify-center h-full space-x-1">
      <TimeControlsWrapper
        showTimer={showTimer}
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
