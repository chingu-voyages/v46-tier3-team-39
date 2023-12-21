"use client";
import { QuestionSubmission } from "@prisma/client";
import { Container, Typography } from "@mui/material";
import React, { memo } from "react";
import { recentQuestionSubmissionColumnNames } from "./RecentSubmissions";
import useQuestionSubmissionsData from "@/app/util/components/submissions/hooks/useQuestionSubmissionsData";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import styles from "../styles";
import { useElementPos } from "@/app/util/providers/elementPosProvider";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
const determineListItemStyles = (width: number) => {
  const desktopItemClassNames = [
    "justify-center",
    "last:justify-end",
    "first:justify-start",
    "items-center",
    "text-center",
    "last:text-right",
    "first:text-left",
  ];
  const containerItemClasses = [...styles.listItem.container];
  const itemClassNames =
    width > 600
      ? [...styles.listItem.columnItem, ...desktopItemClassNames]
      : [...styles.listItem.columnItem];
  const classesGeneral = [];
  const questionClasses = [];
  switch (true) {
    case width > 1000:
      classesGeneral.push("w-[9rem]");
      questionClasses.push("w-[14rem]");
      break;
    case width > 800:
      classesGeneral.push("w-[7rem]");
      questionClasses.push("w-[12rem]");
      break;
    case width > 700:
      classesGeneral.push("w-[6rem]");
      questionClasses.push("w-[10rem]");
      break;
    case width > 600:
      classesGeneral.push("w-[5.5rem]");
      questionClasses.push("w-[9rem]");
      break;
    case width > 400:
      containerItemClasses.push("flex-col");
      itemClassNames.push("w-full");
      break;
    case width > 300:
      containerItemClasses.push("flex-col");
      itemClassNames.push("w-full");
      break;
    default:
      containerItemClasses.push("flex-col");
      itemClassNames.push("w-full");
      break;
  }
  return {
    itemClassNames,
    classesGeneral,
    questionClasses,
    containerItemClasses,
  };
};
const QuestionSubmissionsListItemInner = ({
  containerWidth,
  children,
  columnName,
  classNames,
}: {
  containerWidth: number;
  children: React.ReactNode;
  columnName: [string, keyof QuestionSubmission];
  classNames: string[];
}) => {
  return (
    <>
      <Container key={columnName[1]} className={classNames.join(" ")}>
        {containerWidth <= 600 && (
          <Typography className="w-[8rem]">{columnName[0]}</Typography>
        )}
        <ConditionalWrapper
          condition={containerWidth <= 600}
          wrapper={(children) => (
            <Container className="w-full px-1">{children}</Container>
          )}
        >
          {children}
        </ConditionalWrapper>
      </Container>
    </>
  );
};
const QuestionSubmissionsListItem = (props: Partial<QuestionSubmission>) => {
  const position = useElementPos();
  const containerWidth = position?.position.width || 0;
  const {
    normalizedDateCreated,
    normalizedScore,
    timeType,
    normalizedTimeTaken,
  } = useQuestionSubmissionsData(props);
  const {
    itemClassNames,
    classesGeneral,
    questionClasses,
    containerItemClasses,
  } = determineListItemStyles(containerWidth);
  return (
    <Container className={containerItemClasses.join(" ")}>
      {recentQuestionSubmissionColumnNames(containerWidth).map((columnName) => {
        const value = props[columnName[1]];
        const classNames = [...itemClassNames];
        let innerChild: React.ReactNode = <></>;
        switch (columnName[1]) {
          case "questionName":
            classNames.push(...questionClasses);
            if (containerWidth > 600) classNames.push("text-xs");
            innerChild = value?.toString() || "Untitled";
            break;
          case "questionType":
            classNames.push(...classesGeneral);
            innerChild = value?.toString() || "N/A";
            break;
          case "time":
            classNames.push(...classesGeneral);
            innerChild = (
              <>
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
              </>
            );
            break;
          case "score":
            classNames.push(...classesGeneral);
            innerChild = normalizedScore;
            break;
          case "dateCreated":
            classNames.push(...classesGeneral);
            innerChild = normalizedDateCreated;
            break;
          default:
            break;
        }
        return (
          <QuestionSubmissionsListItemInner
            containerWidth={containerWidth}
            classNames={classNames}
            columnName={columnName}
            key={columnName[0]}
          >
            {innerChild}
          </QuestionSubmissionsListItemInner>
        );
      })}
    </Container>
  );
};
const MemoizedQuestionSubmissionsListItem = memo(QuestionSubmissionsListItem);
export default MemoizedQuestionSubmissionsListItem;
