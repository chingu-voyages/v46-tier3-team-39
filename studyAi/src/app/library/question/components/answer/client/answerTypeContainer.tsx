"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import { MultipleChoice, SelectMultiple } from "./answerInputs";
import dynamic from "next/dynamic";
//this is needed since short answer uses auto-generated ids
const ShortAnswer = dynamic(
  () => import("./answerInputs").then((module) => module.ShortAnswer),
  { ssr: false }
);

export const AnswerType = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions.map[params.id] : null;
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
