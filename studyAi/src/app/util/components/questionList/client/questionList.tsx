"use client";
import { Question } from "@prisma/client";

export default function QuestionsList({ questions }: { questions: Partial<Question>[] }) {
  const formatedQuestions = questions.map((question, index) => {
    return (
      
    );
  });
  return (
    <>
    </>
  );
}
