"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
const QuestionSubmissionsListItem = (props: Partial<QuestionSubmission>) => {
  return <div className="border-b odd:bg-neutral-neutral90">{props.id}</div>;
};
const MemoizedQuestionSubmissionsListItem = memo(QuestionSubmissionsListItem);
export default MemoizedQuestionSubmissionsListItem;
