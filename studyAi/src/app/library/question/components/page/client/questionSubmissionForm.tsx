"use client";
import React, { useTransition } from "react";
import { useQuestions } from "@/app/stores/questionStore";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { uploadQuestionSubmisison } from "../server/actions";
import ObjectID from "bson-objectid";
const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  // define hooks
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const [pending, startTransition] = useTransition();
  const [currSubmissions, { deleteItems, addOrUpdateItems }] =
    useQuestionSubmissions();
  if (!question) return <></>;
  const submission = currSubmissions.ongoingData[question.id];
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //prevent multiple submissions
    if (pending) return;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { timeInputType, timeTaken, totalTimeGiven } = data;
    startTransition(async () => {
      const result = await uploadQuestionSubmisison({
        submission: {
          ...submission,
          questionName: question?.questionInfo?.title,
        },
        timeInputs: {
          timeInputType: timeInputType?.toString(),
          timeTaken: timeTaken?.toString(),
          totalTimeGiven: totalTimeGiven?.toString(),
        },
      });
      if (!result) return;
      addOrUpdateItems(
        [
          {
            ...result,
            questionId: result.questionId || ObjectID().toString(),
          },
        ],
        "submitted"
      );
      deleteItems([
        {
          questionId: question.id,
        },
      ]);
    });
  };
  return (
    <form className="flex flex-col w-full grow h-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
export default QuestionFormWrapper;
