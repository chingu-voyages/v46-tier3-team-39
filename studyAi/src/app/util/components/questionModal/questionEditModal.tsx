"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LeftContent from "./components/leftContent/leftContent";
import AnswerEditor from "./components/answerEditor/answerEditor";
import Controls from "./components/controls";
import styles from "./ModalStyles";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { ForwardedRef, SetStateAction, forwardRef, useState } from "react";

export interface QuestionProps {
  questionData: Partial<Question>;
  closeHandler: () => void;
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>;
}
const QuestionEditForm = forwardRef(
  (props: QuestionProps, ref: ForwardedRef<any>) => {
    return (
      <div className={styles.modal}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.closeIcon}
          onClick={props.closeHandler}
        />
        <h1 className={styles.h1}>Question Editor</h1>
        <Controls
          closeHandler={props.closeHandler}
          questionData={props.questionData}
          setQuestionData={props.setQuestionData}
        />
        <div className={styles.contentLayout}>
          <LeftContent 
            questionData={props.questionData} 
            setQuestionData={props.setQuestionData}
            />
          <AnswerEditor 
            questionData={props.questionData} 
            setQuestionData={props.setQuestionData}
            />
        </div>
      </div>
    );
  }
);

export default QuestionEditForm;
