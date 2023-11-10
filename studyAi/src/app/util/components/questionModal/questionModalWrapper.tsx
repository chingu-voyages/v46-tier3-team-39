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
  const [questionData, setQuestionData] = useState<Partial<Question> | null>(
    initialQuestionData ? {...initialQuestionData, private: true, answer: {correctAnswer: ["2"]}} : null
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
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal
        open={isOpen}
        className={styles.modal}
        onClose={() => setIsOpen(false)}
      >
        <QuestionEditForm
          setIsOpen={setIsOpen}
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </Modal>
    </div>
  );
};

export default QuestionModalWrapper;
