import formatMilliseconds from "./formatMilliseconds";
import removeNonIntegerChars from "./removeNonIntegerChars";
export const splitTimeStrBy2 = (str: string) => {
  const arr = [];
  for (let i = 0; i < str.length; i += 2) {
    const chunk = str.slice(i, i + 2);
    arr.push(chunk);
  }
  return arr;
};
export const timeLabelData: {
  abbrev: "h" | "m" | "s";
  label: "hours" | "minutes" | "seconds";
}[] = [
  { abbrev: "h", label: "hours" },
  { abbrev: "m", label: "minutes" },
  { abbrev: "s", label: "seconds" },
];
export const createTimeStringFromMilliseconds = (milliseconds: number) => {
    const timeElapsed = formatMilliseconds(milliseconds) as string;
    const timeStr = removeNonIntegerChars(timeElapsed);
    const timeArr = splitTimeStrBy2(timeStr);
    //this creates the new total time string
    const parsedTimeElapsed =
      timeArr.reduce(
        (a, b, idx) => a + timeLabelData[idx - 1].abbrev + " " + b
        ) + timeLabelData[timeLabelData.length - 1].abbrev;
    return parsedTimeElapsed
}