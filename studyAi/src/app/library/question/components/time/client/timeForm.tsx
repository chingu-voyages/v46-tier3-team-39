"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import removeNonIntegerChars from "@/app/util/parsers/removeNonIntegerChars";
import { unstable_batchedUpdates } from "react-dom";
import { extractTime } from "@/app/util/parsers/formatMilliseconds";
export const timeLabelData: {
  abbrev: "h" | "m" | "s";
  label: "hours" | "minutes" | "seconds";
}[] = [
  { abbrev: "h", label: "hours" },
  { abbrev: "m", label: "minutes" },
  { abbrev: "s", label: "seconds" },
];
const determineNewVal = (
  newValArr: string[],
  name: string,
  prevVal: string
) => {
  //determine new value from parsed arr
  let newVal: string;
  switch (name) {
    case "hours":
      newVal = newValArr[0];
      break;
    case "minutes":
      newVal = newValArr[1];
      break;
    case "seconds":
      newVal = newValArr[2];
      break;
    default:
      newVal = prevVal;
      break;
  }
  return newVal;
};
export const splitTimeStrBy2 = (str: string) => {
  const arr = [];
  for (let i = 0; i < str.length; i += 2) {
    const chunk = str.slice(i, i + 2);
    arr.push(chunk);
  }
  return arr;
};
const FieldInput = ({
  onChange,
  value,
  name,
  label,
  abbrev,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  label: string;
  abbrev: "h" | "m" | "s";
}) => {
  const ref = useRef<HTMLInputElement | null>();
  const [cursor, setCursor] = useState<number | null>(null);
  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);
  return (
    <div className="flex h-full mx-2">
      <TextField
        inputRef={ref}
        required
        aria-label={label}
        label={""}
        variant="standard"
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        sx={{ minHeight: "unset", minWidth: "unset" }}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          const selectionEnd = target.selectionEnd;
          setCursor(selectionEnd);
        }}
        inputProps={{
          className: "text-5xl sm:text-7xl w-12 sm:w-18 tracking-wider",
          style: {
            minHeight: "unset",
            minWidth: "unset",
            textAlign: "center",
            height: "inherit",
          },
        }}
      />
      <label className="text-2xl pb-1 sm:text-4xl text-neutral-neutral40 flex items-end">
        {abbrev}
      </label>
    </div>
  );
};
const StopWatchPlaceholder = () => {
  return (
    <div className="flex items-center justify-center h-full w-full text-Black p-5">
      <div className="flex  border-b border-b-Black py-3 h-14">
        <Typography className="flex text-5xl sm:text-7xl tracking-wider items-end leading-[0.7]">
          {"0"}
        </Typography>
        <Typography className="text-2xl sm:text-4xl flex items-end leading-[0.7]">
          {"s"}
        </Typography>
        <Typography className="text-3xl sm:text-5xl flex items-end leading-[0.7] ml-2">
          {"00"}
        </Typography>
      </div>
    </div>
  );
};
function TimerInput() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [totalTime, setTotalTime] = useState("00h 00m 00s");
  const timeVals: {
    [key: string]: string;
  } = {
    hours,
    minutes,
    seconds,
  };
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const dispatchVals: {
      [key: string]: Dispatch<SetStateAction<string>>;
    } = {
      hours: setHours,
      minutes: setMinutes,
      seconds: setSeconds,
      totalTime: setTotalTime,
    };
    let setAction = dispatchVals[name];
    setAction((prevVal) => {
      const maxLength = timeLabelData.length * 2;
      //set the current values
      const parsedVal = removeNonIntegerChars(value);
      timeVals[name] = parsedVal;
      let currIntegers = removeNonIntegerChars(
        `${timeVals.hours}${timeVals.minutes}${timeVals.seconds}`
      );
      //we remove the difference from the start of the string
      //therefore maintaing the default string length
      const diff = currIntegers.length - maxLength;
      if (currIntegers.length > maxLength)
        currIntegers = currIntegers.substring(diff, currIntegers.length);
      //we pad the beginning with zeros in case of delete
      if (currIntegers.length < maxLength)
        currIntegers = currIntegers.padStart(maxLength, "0");
      //this means that incorrect values were entered
      //this is therefore not a correct input
      if (currIntegers.length !== maxLength) return prevVal;
      const newValArr = splitTimeStrBy2(currIntegers);
      const newVal = determineNewVal(newValArr, name, prevVal);
      //this creates the new total time string
      const newTotalTime =
        newValArr.reduce(
          (a, b, idx) => a + timeLabelData[idx - 1].abbrev + " " + b
        ) + timeLabelData[timeLabelData.length - 1].abbrev;
      //we can do this because we are using 
      //updating from the same component
      unstable_batchedUpdates(() => {
        //update new total time
        if (name !== "hours") setHours(newValArr[0]);
        if (name !== "minutes") setMinutes(newValArr[1]);
        if (name !== "seconds") setSeconds(newValArr[2]);
        setTotalTime(newTotalTime);
      });
      return newVal;
    });
  };
  return (
    <div className="flex justify-center p-5 [&>*]:h-14">
      {timeLabelData.map((a) => (
        <FieldInput
          key={a.label}
          onChange={onChange}
          name={a.label}
          label={a.label}
          value={timeVals[a.label]}
          abbrev={a.abbrev}
        />
      ))}
      <TextField
        id="totalTimeInput"
        name={"totalTime"}
        aria-readonly
        value={totalTime}
        sx={{
          visibility: "hidden",
          minWidth: "unset",
          minHeight: "unset",
          width: 0,
          height: 0,
        }}
      />
    </div>
  );
}
const btnStyles = {
  textTransform: "none",
  padding: 0,
  margin: 0,
  minHeight: "unset",
};
export const TimeForm = ({
  setCurrType,
  setCurrTotalTimeGiven,
  setModalOpen,
}: {
  setCurrType: Dispatch<SetStateAction<string | undefined>>;
  setCurrTotalTimeGiven: Dispatch<SetStateAction<number | null | undefined>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [timeType, setTimeType] = useState("stopwatch");
  const onTimeTypeChange = (
    e: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTimeType(newValue);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (timeType === "stopwatch")
      return unstable_batchedUpdates(() => {
        setCurrType(timeType);
        setModalOpen(false);
      });
    const { totalTime } = data;
    const { hours, minutes, seconds } = extractTime(
      totalTime.toString(),
      false
    );
    const timeTotalSeconds =
      parseInt(hours.toString(), 10) * 3600 +
      parseInt(minutes.toString(), 10) * 60 +
      parseInt(seconds.toString(), 10);
    unstable_batchedUpdates(() => {
      setCurrType(timeType);
      setCurrTotalTimeGiven(timeTotalSeconds * 1000);
      setModalOpen(false);
    });
  };
  return (
    <div className="max-h-[80%] min-w-[90%] md:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] flex flex-col bg-White p-[6%] md:p-[3%] overflow-y-auto">
      <Typography
        variant="h6"
        component="h2"
        className="text-Black text-center"
      >
        Track Your Time
      </Typography>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full mt-4 items-center border border-Black pb-4"
      >
        <Tabs
          className="flex flex-row w-full text-Black h-12 [&_.MuiTabs-flexContainer]:h-full border-b border-Black"
          value={timeType}
          aria-label="time-options"
          sx={{
            minHeight: "unset",
          }}
          onChange={onTimeTypeChange}
        >
          <Tab
            value={"stopwatch"}
            label="Stopwatch"
            className="flex items-center justify-center h-full w-3/6"
            sx={btnStyles}
          />
          <Tab
            className="flex items-center justify-center h-full w-3/6"
            value={"timer"}
            label="Timer"
            sx={btnStyles}
          />
        </Tabs>
        {timeType === "timer" && <TimerInput />}
        {timeType === "stopwatch" && <StopWatchPlaceholder />}
        <Button
          type="submit"
          sx={{ textTransform: "none" }}
          className="mt-5 ml-5 self-start text-Black"
          variant="contained"
        >
          {timeType === "stopwatch" ? "Start" : "Create Timer"}
        </Button>
      </form>
    </div>
  );
};
export default TimeForm;
