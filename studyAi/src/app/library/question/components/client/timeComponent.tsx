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
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TimeOptions } from "../../../../../../prisma/generated/type-graphql";
import removeNonIntegerChars from "@/app/util/parsers/removeNonIntegerChars";
import { unstable_batchedUpdates } from "react-dom";
import { extractTime } from "@/app/util/parsers/formatMilliseconds";
//we can manage time on the frontend
//because time measurements are only
//for the user's benefit
//if we need to ensure compliance to time
//we must manage it using a websocket connection
type TimeProps = TimeOptions & {
  initialTime: number;
};
const timeOrder: {
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
const splitTimeStrBy2 = (str: string) => {
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
    <div className="flex h-full">
      <TextField
        inputRef={ref}
        required
        aria-label={label}
        label={""}
        variant="standard"
        name={name}
        type="text"
        inputProps={{
          className: "w-22 text-7xl tracking-wider",
          style: { minHeight: "unset", minWidth: "unset", textAlign: "center" },
        }}
        sx={{ minHeight: "unset", minWidth: "unset" }}
        onChange={onChange}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          const selectionEnd = target.selectionEnd;
          setCursor(selectionEnd);
        }}
        value={value}
      />
      <label className="h-full text-4xl text-neutral-neutral40">{abbrev}</label>
    </div>
  );
};
function TimerInput() {
  // const ref = useRef<HTMLInputElement | null>();
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
      const maxLength = timeOrder.length * 2;
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
          (a, b, idx) => a + timeOrder[idx - 1].abbrev + " " + b
        ) + timeOrder[timeOrder.length - 1].abbrev;

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
    <div className="flex w-full">
      {timeOrder.map((a) => (
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

const TimeForm = ({
  setCurrType,
  setCurrTotalTimeGiven,
}: {
  setCurrType: Dispatch<SetStateAction<string | undefined>>;
  setCurrTotalTimeGiven: Dispatch<SetStateAction<number | null | undefined>>;
}) => {
  const [timeType, setTimeType] = useState("timer");
  const onTimeTypeChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    setTimeType(target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { totalTime } = data;
    const { hours, minutes, seconds } = extractTime(totalTime.toString());
    const timeTotalSeconds =
      parseInt(hours.toString(), 10) * 3600 +
      parseInt(minutes.toString(), 10) * 60 +
      parseInt(seconds.toString(), 10);
    console.log(data);
  };
  const borderStyle: SxProps = {
    borderWidth: 1,
    borderStyle: "solid",
  };
  return (
    <div className="max-h-[80%] flex flex-col items-center bg-White p-[6%] md:p-[3%] overflow-y">
      <Typography variant="h6" component="h2" className="text-Black">
        Track Your Time
      </Typography>
      <form onSubmit={onSubmit} className="flex flex-col w-full mt-6">
        <RadioGroup
          name="time-tracking-group"
          className="flex flex-row w-full text-Black space-x-5"
        >
          <Box
            sx={{
              ...borderStyle,
              borderColor:
                timeType === "stopwatch" ? "primary:main" : "transparent",
            }}
          >
            <FormControlLabel
              value="stopwatch"
              control={<Radio />}
              label="Stopwatch"
              labelPlacement="bottom"
              onChange={onTimeTypeChange}
              checked={timeType === "stopwatch"}
              className="flex items-center justify-center aspect-square h-[5rem] md:h-[10rem]"
            />
          </Box>
          <Box
            sx={{
              ...borderStyle,
              borderColor:
                timeType === "timer" ? "primary:main" : "transparent",
            }}
          >
            <FormControlLabel
              value="timer"
              control={<Radio />}
              label="Timer"
              labelPlacement="bottom"
              onChange={onTimeTypeChange}
              checked={timeType === "timer"}
              className="flex items-center justify-center aspect-square h-[5rem] md:h-[10rem]"
            />
          </Box>
        </RadioGroup>
        {timeType === "timer" && <TimerInput />}
        <Button
          type="submit"
          sx={{ textTransform: "none" }}
          className="mt-5"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export const TimeComponent = ({ props }: { props?: TimeProps }) => {
  const { timeType, initialTime, totalTimeGiven } = props || {
    initialTime: 0,
  };
  const [currType, setCurrType] = useState(timeType);
  const [currInitTime, setCurrInitTime] = useState(initialTime);
  const [currTotalTimeGiven, setCurrTotalTimeGiven] = useState(totalTimeGiven);
  const [modalOpen, setModalOpen] = useState(true);
  switch (currType) {
    case "stopwatch":
      return <StopWatch initialTimeUsed={initialTime} />;
    case "timer":
      return (
        <Timer
          initialTimeLeft={initialTime}
          totalTimeGiven={currTotalTimeGiven}
        />
      );
    //create timer component
    default:
      return (
        <>
          {!modalOpen && (
            <Button
              type="button"
              onClick={() => setModalOpen(true)}
              className="h-full"
              sx={{ textTransform: "unset", minHeight: "unset" }}
              aria-label="open-modal-to-attach-stopwatch-or-timer"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="ml-1">Add Time</span>
            </Button>
          )}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="track-your-time"
            aria-describedby="attach-stopwatch-or-timer"
            className="flex justify-center items-center"
          >
            <>
              <TimeForm
                setCurrType={setCurrType}
                setCurrTotalTimeGiven={setCurrTotalTimeGiven}
              />
            </>
          </Modal>
        </>
      );
  }
};
