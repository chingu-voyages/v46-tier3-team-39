"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
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
import formatMilliseconds, {
  extractTime,
} from "@/app/util/parsers/formatMilliseconds";
//we can manage time on the frontend
//because time measurements are only
//for the user's benefit
//if we need to ensure compliance to time
//we must manage it using a websocket connection
type TimeProps = TimeOptions & {
  initialTime: number;
};
const defaultTime = formatMilliseconds(0) as string;
const timeOrder = ["h", "m", "s"];
function TimerInput() {
  const [totalTime, setTotalTime] = useState(
    defaultTime
      .split(":")
      .map((a, idx) => a + timeOrder[idx])
      .reduce((a, b) => a + " " + b)
  );
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    // setTotalTime((prevVal) => {
    //   const currVal = target.value
    //   let newVal = ""
    //   if (prevVal < currVal) newVal = "0" + currVal.substring(1, currVal.length)
    //   else 
    //   const { hours, minutes, seconds } = extractTime(currVal, false);

    // })
    // if (!(hours) || !(minutes) || !(seconds)) return;
    // console.log(hours, minutes, seconds)
    
    
    // const timeTotalSeconds =
    //   parseInt(hours.toString().padStart(2, "0"), 10) * 3600 +
    //   parseInt(minutes.toString().padStart(2, "0"), 10) * 60 +
    //   parseInt(seconds.toString().padStart(2, "0"), 10);
    
    // const timeInMilliseconds = timeTotalSeconds * 1000;
    // const formattedTime = formatMilliseconds(timeInMilliseconds) as string;
    // const userReadableTime = formattedTime
    //   .split(":")
    //   .map((a, idx) => a + timeOrder[idx])
    //   .reduce((a, b) => a + " " + b);
    // console.log(userReadableTime);
    //setTotalTime(userReadableTime);
  };
  return (
    <div className="">
      <TextField
        required
        label={"Total Time"}
        name="totalTime"
        type="text"
        sx={{ minHeight: "unset" }}
        onChange={onChange}
        value={totalTime}
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
