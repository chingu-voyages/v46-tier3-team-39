function formatMilliseconds(milliseconds: number, inArr?: boolean) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  let seconds = totalSeconds;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  if (inArr)
    return [formattedHours, ":", formattedMinutes, ":", formattedSeconds];
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function extractTime(timeString: string, splitByColon: boolean = true) {
  const [hours, minutes, seconds] = splitByColon
    ? timeString.split(":")
    : timeString.split(/[hms:]/).filter(Boolean);
  const time = {
    hours: hours.padStart(2, "0"),
    minutes: minutes.padStart(2, "0"),
    seconds: seconds.padStart(2, "0"),
  };
  return time;
}

export default formatMilliseconds;
