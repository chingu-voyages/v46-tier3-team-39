import { memo } from "react";
import { QuestionSubmission } from "@prisma/client";
import MemoizedQuestionSubmissionPageListItem from "./QuestionSubmissionPageListItem";
const QuestionSubmissionsPageListData = (data: Partial<QuestionSubmission>[]) =>
  data.map((submission) => {
    return data.map((submission) => (
      <MemoizedQuestionSubmissionPageListItem
        key={submission.id}
        {...submission}
      />
    ));
  });
export const MemoizedQuestionSubmissionsPageListData = memo(
  QuestionSubmissionsPageListData
);

const QuestionSubmissionsPageList = () => {
  return <div></div>;
};
export default QuestionSubmissionsPageList;
