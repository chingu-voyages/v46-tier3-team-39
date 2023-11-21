"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
import { calculateTimeData } from "../time/server/calculateTimeData";
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
  const { questionName, answerProvided, dateCreated, time, score } = props;
  const { actualScore, maxScore } = score || {};
  //calculate score data
  const scoreExists = actualScore && maxScore;
  const currScore = scoreExists ? actualScore / maxScore : 0;
  const normalizedScore = scoreExists ? (currScore * 100).toFixed(2) : "N/A";
  //calculate time data
  const { timeType, timeTaken, totalTimeGiven } = time || {};
  const { normalizedTimeTaken, timeRemaining } = calculateTimeData({
    timeType,
    timeTaken,
    totalTimeGiven,
  });
  return <div></div>;
};
const MemoizedSubmissionsListItem = memo(
  QuestionSubmissionsListItem,
  arePropsEqual
);
export default MemoizedSubmissionsListItem;
