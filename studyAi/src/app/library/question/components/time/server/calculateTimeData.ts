export const calculateTimeData = ({
  timeTaken,
  timeType,
  totalTimeGiven,
}: {
  timeTaken?: number | null;
  timeType?: string | null;
  totalTimeGiven?: number | null;
}) => {
  let timeExists = Boolean(timeTaken && timeType);
  const currTimeType = timeType || "";
  let normalizedTimeTaken = 0;
  let timeRemaining = 0;
  switch (currTimeType) {
    case "stopwatch":
      if (timeExists && timeTaken && timeExists)
        normalizedTimeTaken = timeTaken;
      else
        return {
          normalizedTimeTaken: "N/A",
        };
      break;
    case "timer":
      if (!(timeExists && totalTimeGiven && timeTaken))
        return {
          normalizedTimeTaken: "N/A",
          timeRemaining: "N/A",
        };
      normalizedTimeTaken = totalTimeGiven - timeTaken;
      timeRemaining = timeTaken;
      break;
    default:
      return {
        normalizedTimeTaken: "N/A",
      };
  }
  return {
    normalizedTimeTaken,
    timeRemaining,
  };
};