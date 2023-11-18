"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useElementPos } from "../../../providers/elementPosProvider";
import { ElementPostionType } from "../../../hooks/useElementSize";
import { Question } from "@prisma/client";
import ObjectId from "bson-objectid";

// Create a new context
const chosenId = ObjectId().toString()
const blankQuestion: Partial<Question> = {
  questionInfo: {
    title: "Addition",
    description: "What is 1+1?",
    options: [
      { id: chosenId, value: "2" },
      { id: ObjectId().toString(), value: "1" },
      { id: ObjectId().toString(), value: "3" },
      { id: ObjectId().toString(), value: "5" },
    ],
  },
  questionType: "Multiple Choice",
  tags: ["math"],
  answer: {
    correctAnswer: [{ id: chosenId, value: "2" }],
  },
  private: true
};

export type QuestionModalDataType = {
  type: { type: "edit" | "create"; layout: "modal" | "page" };
  currElPos: ElementPostionType | null;
  isOpen: boolean;
  questionData: Partial<Question>;
  isGenerating: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  closeHandler: () => void;
  setQuestionData: Dispatch<SetStateAction<Partial<Question>>>;
  onSave?: (e: Partial<Question>) => void;
};

const QuestionModalContext = createContext<QuestionModalDataType | null>(null);
// Context provider component
export function QuestionModalProvider({
  children,
  type,
  initialQuestionData,
  onSave,
}: {
  children: React.ReactNode;
  type: { type: "edit" | "create"; layout: "modal" | "page" };
  initialQuestionData?: Partial<Question>;
  onSave?: (e: Partial<Question>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  //For future optimization,
  // split the following data into different context providers
  //and replace hooks for each input. We can then have one function
  //at the top level that modifies the initial values of all the providers
  //and each provider's stored value, is automatically re-rendered with the initial 
  //changes
  const [questionData, setQuestionData] = useState<Partial<Question>>(
    initialQuestionData ? { ...initialQuestionData } : blankQuestion
  );
  const currElPos = useElementPos();
  const closeHandler = useCallback(() => {
    setIsOpen(false);
    setQuestionData(
      initialQuestionData ? { ...initialQuestionData } : blankQuestion
    );
  }, [initialQuestionData]);
  return (
    <QuestionModalContext.Provider
      value={{
        isOpen,
        isGenerating,
        questionData,
        type,
        currElPos,
        setIsGenerating,
        onSave,
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
