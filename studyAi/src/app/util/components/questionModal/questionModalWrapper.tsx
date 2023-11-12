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
        options: [{id: "1", value: "Answer 1"}, {id: "2", value: "Answer 2"}, {id: "3", value: "Answer 3"}, {id: "4", value: "Answer 4"}]
    },
    questionType: "Multiple Choice",
    tags: [],
    answer: {
      correctAnswer: [{id: "1", value: "A"}]
    }
  }
  const [questionData, setQuestionData] = useState<Partial<Question>>(
    initialQuestionData ? {...initialQuestionData, private: true} : blankQuestion
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log(questionData);
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
