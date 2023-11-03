"use client";
import { useState } from "react";
import { NavigationBtns, PaginationOptions } from "./navigationBtns";
import { QuestionWrapper } from "./questionWrapper";
import StopWatch from "@/app/util/components/time/stopwatch";
import Timer from "@/app/util/components/time/timer";
import { Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
type TimeOptions = {
  type: "stopwatch" | "timer";
  initialTime: number;
  totalTimeGiven?: number;
};
const TimeComponent = ({ props }: { props?: TimeOptions }) => {
  const { type, initialTime, totalTimeGiven } = props || {
    initialTime: 0,
  };
  const [currType, setCurrType] = useState(type);
  const [currInitType, setCurrInitType] = useState(initialTime);
  const [currTotalTimeGiven, setCurrTotalTimeGiven] = useState(totalTimeGiven);
  const [modalOpen, setModalOpen] = useState(false);
  switch (type) {
    case "stopwatch":
      return <StopWatch initialTimeUsed={initialTime} />;
    case "timer":
      return (
        <Timer initialTimeLeft={initialTime} totalTimeGiven={totalTimeGiven} />
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
          >
            <></>
          </Modal>
        </>
      );
    // return createPortal();
  }
};
const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;
  };
  return (
    <form className="flex flex-col w-full grow h-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
const OngoingQuestionBar = ({
  pagination,
}: {
  pagination?: PaginationOptions;
}) => {
  if (pagination)
    return (
      <NavigationBtns pagination={pagination}>
        <TimeComponent />
      </NavigationBtns>
    );
  return (
    <div className="h-10 mt-1">
      <TimeComponent />
    </div>
  );
};
const QuestionPageContainer = () => {
  return (
    <QuestionFormWrapper>
      <OngoingQuestionBar pagination={{ onPrev: () => {}, onNext: () => {} }} />
      <QuestionWrapper />
    </QuestionFormWrapper>
  );
};
export default QuestionPageContainer;
