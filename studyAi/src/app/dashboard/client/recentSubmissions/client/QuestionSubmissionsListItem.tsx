"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
const QuestionSubmissionsListItem = (props: Partial<QuestionSubmission>) => {
  return <div>{props.id}</div>;
};
const MemoizedQuestionSubmissionsListItem = memo(QuestionSubmissionsListItem);
export default MemoizedQuestionSubmissionsListItem;
