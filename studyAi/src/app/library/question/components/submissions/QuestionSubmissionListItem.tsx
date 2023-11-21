"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
//since we're memoizing, so we define our custom logic comparison
const arePropsEqual = (
  prevProps: Partial<QuestionSubmission>,
  newProps: Partial<QuestionSubmission>
) => {
  const { answerProvided } = prevProps;
  const { answerProvided: newAnswerProvided } = newProps;
  const isArrEqual =
    answerProvided && newAnswerProvided
      ? answerProvided.every(
          (value, index) =>
            value.id === newAnswerProvided[index].id &&
            value.value === newAnswerProvided[index].value
        ) && newAnswerProvided.length === answerProvided.length
      : newAnswerProvided || answerProvided
      ? false
      : newAnswerProvided === answerProvided;
  return (
    prevProps.id === newProps.id &&
    prevProps.questionId === newProps.questionId &&
    prevProps.userId === newProps.userId &&
    prevProps.score?.actualScore === newProps.score?.actualScore &&
    prevProps.score?.maxScore === newProps.score?.maxScore &&
    prevProps.time?.timeTaken === newProps.time?.timeTaken &&
    prevProps.time?.timeType === newProps.time?.timeType &&
    prevProps.time?.totalTimeGiven === newProps.time?.totalTimeGiven &&
    isArrEqual
  );
};
const QuestionSubmissionsListItem = (
  props: Partial<QuestionSubmission> & { questionName: string }
) => {
  return <div></div>;
};
const MemoizedSubmissionsListItem = memo(
  QuestionSubmissionsListItem,
  arePropsEqual
);
export default MemoizedSubmissionsListItem;
