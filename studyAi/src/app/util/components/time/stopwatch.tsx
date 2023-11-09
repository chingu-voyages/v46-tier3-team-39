"use client";
import formatMilliseconds from "../../parsers/formatMilliseconds";
import { useTimeHook } from "./context/useTimeContext";
import TimeControlsWrapper from "./timeControls";
type StopWatchProps = {
  customBtns?: React.ReactNode;
  showTimer?: boolean;
};
const StopWatch = ({
  customBtns,
  showTimer,
}: StopWatchProps) => {
  const timeContext = useTimeHook();
  if (!timeContext) return <></>;
  const { time } = timeContext;
  const timeArr = formatMilliseconds(time, true);
  return (
    <TimeControlsWrapper
      showTimer={showTimer}
      customBtns={customBtns}
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
