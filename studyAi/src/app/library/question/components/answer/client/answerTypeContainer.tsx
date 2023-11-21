"use client";
import { useQuestions } from "@/app/stores/questionStore";
import { MultipleChoice, SelectMultiple } from "./answerInputs";
import dynamic from "next/dynamic";
import { useQuestionId } from "../../../context/QuestionIdContext";
//this is needed since short answer uses auto-generated ids
const ShortAnswer = dynamic(
  () => import("./answerInputs").then((module) => module.ShortAnswer),
  { ssr: false }
);

export const AnswerType = () => {
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  if (!question) return <></>;
  if (!question.questionInfo) return <></>;
  const {
    questionType,
    questionInfo: { options: questionOptions },
  } = question;
  switch (questionType) {
    case "Multiple Choice":
      return (
        <MultipleChoice options={questionOptions} questionId={question.id} />
      );
    case "Select Multiple":
      return (
        <SelectMultiple options={questionOptions} questionId={question.id} />
      );
    case "Short Answer":
      return <ShortAnswer questionId={question.id} />;
    default:
      return <ShortAnswer questionId={question.id} />;
  }
};
