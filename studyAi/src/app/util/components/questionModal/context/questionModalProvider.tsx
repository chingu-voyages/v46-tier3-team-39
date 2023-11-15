"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useElementPos } from "../../../providers/elementPosProvider";
import { ElementPostionType } from "../../../hooks/useElementSize";
import { Question } from "@prisma/client";
// Create a new context
const blankQuestion: Partial<Question> = {
  questionInfo: {
    title: "",
    description: "",
    options: [
      { id: "1", value: "Answer 1" },
      { id: "2", value: "Answer 2" },
      { id: "3", value: "Answer 3" },
      { id: "4", value: "Answer 4" },
    ],
  },
  questionType: "Multiple Choice",
  tags: [],
  answer: {
    correctAnswer: [{ id: "1", value: "A" }],
  },
};

export type QuestionModalDataType = {
  type: { type: "edit" | "create"; layout: "modal" | "page" };
  currElPos: ElementPostionType | null;
  isOpen: boolean;
  questionData: Partial<Question>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeHandler: () => void;
  setQuestionData: Dispatch<SetStateAction<Partial<Question>>>;
};

const QuestionModalContext = createContext<QuestionModalDataType | null>(null);
// Context provider component
export function QuestionModalProvider({
  children,
  type,
  initialQuestionData,
}: {
  children: React.ReactNode;
  type: { type: "edit" | "create"; layout: "modal" | "page" };
  initialQuestionData?: Partial<Question>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [questionData, setQuestionData] = useState<Partial<Question>>(
    initialQuestionData
      ? { ...initialQuestionData, private: true }
      : blankQuestion
  );
  const currElPos = useElementPos();
  const closeHandler = () => {
    setIsOpen(false);
    setQuestionData(
      initialQuestionData
        ? { ...initialQuestionData, private: true }
        : blankQuestion
    );
  };
  return (
    <QuestionModalContext.Provider
      value={{
        isOpen,
        questionData,
        type,
        currElPos,
        closeHandler,
        setIsOpen,
        setQuestionData,
      }}
    >
      {children}
    </QuestionModalContext.Provider>
  );
}
// Custom hook to access the ElementPosContext
export function useQuestionModal() {
  return useContext(QuestionModalContext);
}
