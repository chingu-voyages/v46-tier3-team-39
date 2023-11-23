"use client";
import { QuestionSubmission } from "@prisma/client";
import { memo } from "react";
import { calculateTimeData } from "../time/server/calculateTimeData";
import { Container, Typography } from "@mui/material";
import { styles } from "./styles";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { AccessAlarm } from "@mui/icons-material";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
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
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;
  const { questionName, dateCreated, time, score } = props;
  const { actualScore, maxScore } = score || {};
  //calculate score data
  const scoreExists = actualScore && maxScore;
  const currScore = scoreExists ? actualScore / maxScore : 0;
  const normalizedScore = scoreExists
    ? (currScore * 100).toFixed(2) + "%"
    : "N/A";
  //calculate time data
  const { timeType, timeTaken, totalTimeGiven } = time || {};
  const { normalizedTimeTaken } = calculateTimeData({
    timeType,
    timeTaken: 10000000,
    totalTimeGiven,
  });
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
  const normalizedDateCreated = dateCreated
    ? new Date(dateCreated).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";
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
