"use client";
import { QuestionSubmission } from "@prisma/client";
import { Container } from "@mui/material";
import { memo } from "react";
import { recentQuestionSubmissionColumnNames } from "./RecentSubmissions";
const QuestionSubmissionsListItem = (props: Partial<QuestionSubmission>) => {
  return (
    <Container className="border-b last:border-b-0">
      {props.id}
    </Container>
  );
};
const MemoizedQuestionSubmissionsListItem = memo(QuestionSubmissionsListItem);
export default MemoizedQuestionSubmissionsListItem;
