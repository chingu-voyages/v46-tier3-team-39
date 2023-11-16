"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AnswerEditor from "./components/answerEditor/answerEditor";
import QuestionEditor from "./components/questionEditor/questionEditor";
import Controls from "./components/controls";
import styles, {
  determineMainContentLayoutStyle,
  determineModalStyle,
} from "./ModalStyles";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { SetStateAction } from "react";
import { useQuestionModal } from "./context/questionModalProvider";
import { IconButton } from "@mui/material";

export interface QuestionProps {
  questionData: Partial<Question>;
  closeHandler: () => void;
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>;
}
const QuestionFormHeader = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { type, currElPos, closeHandler } = modalData;
  const formTypeHeaderText = type.type === "edit" ? "Edit" : "Create";
  const currBtnClasses = [...styles.header.closeIcon.btn];
  const currHeaderClasses = [...styles.header.h1];
  const currHeaderContainerClasses = [...styles.header.container];
  if (currElPos) {
    const width = currElPos.position.width;
    //handle header text
    if (width > 640) currHeaderClasses.push("text-5xl");
    else if (width > 480) currHeaderClasses.push("text-3xl");
    else currHeaderClasses.push("text-2xl");
    //handle container margins
    if (width > 640) currHeaderContainerClasses.push("mb-8");
    else currHeaderContainerClasses.push("mb-5");
  }
  return (
    <div className={currHeaderContainerClasses.join(" ")}>
      {type.layout === "modal" && (
        <IconButton
          onClick={closeHandler}
          className={currBtnClasses.join(" ")}
          aria-label="close-question-modal"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.header.closeIcon.icon.join(" ")}
          />
        </IconButton>
      )}
      <h1 className={currHeaderClasses.join(" ")}>
        {formTypeHeaderText + " Your Question"}
      </h1>
      {/* <Controls
          closeHandler={closeHandler}
          questionData={questionData}
          setQuestionData={setQuestionData}
        /> */}
    </div>
  );
};
const QuestionFormMainContent = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { currElPos } = modalData;
  const currMainContentContainerClasses = [
    ...styles.mainContentLayout.container,
  ];
  if (currElPos)
    determineMainContentLayoutStyle(
      currElPos.position,
      currMainContentContainerClasses
    );
  return (
    <div className={currMainContentContainerClasses.join(" ")}>
      <QuestionEditor />
      <AnswerEditor />
    </div>
  );
};
const QuestionEditForm = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { type, currElPos } = modalData;
  const currModalClasses = [...styles.modal];
  if (type.layout === "modal")
    currModalClasses.push(
      "min-w-[90%]",
      "md:min-w-[65%]",
      "lg:min-w-[50%]",
      "xl:min-w-[40%]",
      "max-h-[80%]"
    );
  else currModalClasses.push("w-full", "min-h-full");
  if (currElPos) determineModalStyle(currElPos.position, currModalClasses);
  return (
    <div
      className={currModalClasses.join(" ")}
      ref={currElPos ? currElPos.setRef : null}
    >
      <form className={"flex flex-col w-full grow"}>
        <QuestionFormHeader />
        <QuestionFormMainContent />
      </form>
    </div>
  );
};

export default QuestionEditForm;
