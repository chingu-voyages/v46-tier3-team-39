"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styles } from "./styles";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
import useQuestionSubmissionsData from "@/app/util/components/submissions/hooks/useQuestionSubmissionsData";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionListItem/arePropsEqual";
const QuestionSubmissionsListItem = (props: Partial<QuestionSubmission>) => {
  const {
    normalizedDateCreated,
    normalizedScore,
    isMobile,
    timeType,
    normalizedTimeTaken,
  } = useQuestionSubmissionsData(props);
  const listItemContainer = [...styles.listContainer.item.container];
  const listItemContainerTextDesktop = [
    "justify-center",
    "first:justify-start",
    "last:justify-end",
  ];
  const listItemContainerText = [
    ...styles.listContainer.item.text,
    ...listItemContainerTextDesktop,
    "text-sm",
  ];
  const scoreListItemContainer = [
    ...styles.listContainer.item.text,
    ...listItemContainerTextDesktop,
    "text-lg",
  ];
  //mobile styles only
  const dateListItemContainerMobile = [
    ...styles.listContainer.item.text,
    "text-xs",
  ];
  const scrollListItemContainerMobile = ["flex", "flex-col", "p-0"];
  return (
    <Container className={listItemContainer.join(" ")}>
      <ConditionalWrapper
        condition={isMobile}
        wrapper={(children) => (
          <Container className={scrollListItemContainerMobile.join(" ")}>
            {children}
          </Container>
        )}
      >
        <Typography className={scoreListItemContainer.join(" ")}>
          {normalizedScore}
        </Typography>
        {isMobile && (
          <Typography className={dateListItemContainerMobile.join(" ")}>
            {normalizedDateCreated}
          </Typography>
        )}
      </ConditionalWrapper>
      <Typography className={listItemContainerText.join(" ")}>
        {timeType === "stopwatch" && (
          <HourglassEmptyIcon
            className="aspect-square w-5"
            sx={{
              height: "auto",
            }}
          />
        )}
        {timeType === "timer" && (
          <AccessAlarm
            className="aspect-square w-5"
            sx={{
              height: "auto",
            }}
          />
        )}
        {normalizedTimeTaken}
      </Typography>
      {!isMobile && (
        <Typography className={listItemContainerText.join(" ")}>
          {normalizedDateCreated}
        </Typography>
      )}
    </Container>
  );
};
const MemoizedSubmissionsListItem = memo(
  QuestionSubmissionsListItem,
  arePropsEqual
);
export default MemoizedSubmissionsListItem;
