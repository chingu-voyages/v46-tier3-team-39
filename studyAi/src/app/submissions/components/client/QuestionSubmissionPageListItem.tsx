"use client";
import useQuestionSubmissionsData from "@/app/util/components/submissions/hooks/useQuestionSubmissionsData";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
type ListItemPropsType = {
  normalizedDateCreated: string;
  normalizedScore: string;
  normalizedTimeTaken: string;
  timeType: string;
};
const ListItem = ({
  normalizedDateCreated,
  normalizedScore,
  normalizedTimeTaken,
  timeType,
}: ListItemPropsType) => {
  return <div></div>;
};
const MobileListItem = ({
  normalizedDateCreated,
  normalizedScore,
  normalizedTimeTaken,
  timeType,
}: ListItemPropsType) => {
  return <div></div>;
};

const QuestionSubmissionPageListItem = (props: Partial<QuestionSubmission>) => {
  const {
    isMobile,
    windowWidth,
    normalizedDateCreated,
    normalizedScore,
    normalizedTimeTaken,
    timeType,
  } = useQuestionSubmissionsData(props);
  const questionName = props.questionName;
  const listItemProps = {
    questionName,
    normalizedDateCreated,
    normalizedScore,
    normalizedTimeTaken,
    timeType,
  };
  if (isMobile) return <MobileListItem {...listItemProps} />;
  return <ListItem {...listItemProps} />;
};
const MemoizedQuestionSubmissionPageListItem = memo(
  QuestionSubmissionPageListItem
);
export default MemoizedQuestionSubmissionPageListItem;
