'use client'
import React, { createContext, useContext } from "react";
export type QuestionIdContextProps = {
  questionId: string;
};
const QuestionIdContext = createContext<QuestionIdContextProps | null>(null);
export const QuestionIdProvider = ({
  questionId,
  children,
}: {
  questionId: string;
  children: React.ReactNode;
}) => {
  return (
    <QuestionIdContext.Provider
      value={{
        questionId,
      }}
    >
      {children}
    </QuestionIdContext.Provider>
  );
};
export function useQuestionId() {
  return useContext(QuestionIdContext);
}
