'use client'
import React, { createContext, useContext } from "react";
export type QuestionIdContextProps = {
  questionId: string;
};
//data context
const QuestionIdContext = createContext<QuestionIdContextProps | null>(null);
//provider
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
//hook, to see how its used
export function useQuestionId() {
  return useContext(QuestionIdContext);
}
