"use client";

import { useState } from "react";
import QuestionEditForm from "./questionEditModal";
import { Modal } from "@mui/material";
import { Question } from "../../../../../prisma/generated/type-graphql";

const QuestionModalWrapper = ({
  children,
  initialQuestionData,
}: {
  children: React.ReactNode;
  initialQuestionData?: Partial<Question>;
}) => {
  const blankQuestion: Partial<Question> = {
    questionInfo: {
        title:"",
        description: "",
        options: ["", "", "", ""]
    },
    questionType: "mcq",
    tags: [],
    answer: {
      correctAnswer: ["0"]
    }
  }
  const [questionData, setQuestionData] = useState<Partial<Question>>(
    initialQuestionData ? {...initialQuestionData, private: true} : blankQuestion
  );
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    modal: [
      "flex",
      "justify-center",
      "items-center",
      "w-10/12",
      "h-[80vh]",
      "m-auto",
    ].join(" "),
  };
  const closeHandler = () => {
    setIsOpen(false);
    setQuestionData(initialQuestionData ? {...initialQuestionData, private: true} : blankQuestion);
  }
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        open={isOpen}
        className={styles.modal}
        onClose={closeHandler}
      >
        <QuestionEditForm
          closeHandler={closeHandler}
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </Modal>
    </div>
  );
};

export default QuestionModalWrapper;
