"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
export const AnswerType = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  if (!question) return <></>;
  if (!question.question) return <></>;
  const {
    questionType,
    question: { options: questionOptions },
  } = question;
  switch (questionType) {
    case "multipleChoice":
      return <></>;
    case "selectMultiple":
      return <></>;
    case "shortAnswer":
      return <></>;
    default:
      return <></>;
  }
};
