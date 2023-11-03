function formatMilliseconds(
  milliseconds: number,
  inArr?: boolean
) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  let seconds = totalSeconds;
  const hours = Math.floor(totalSeconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(totalSeconds / 60);
  seconds = seconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  if (inArr)
    return [formattedHours, ":", formattedMinutes, ":", formattedSeconds];
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
export default formatMilliseconds;
