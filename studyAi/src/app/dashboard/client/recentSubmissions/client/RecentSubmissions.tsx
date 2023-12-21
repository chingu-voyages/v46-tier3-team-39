"use client";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { memo, useCallback, useState } from "react";
import MemoizedQuestionSubmissionsListItem from "./QuestionSubmissionsListItem";
import { QuestionSubmission } from "@prisma/client";
import fetchItems from "@/app/util/components/submissions/questionSubmissionPagination/fetchNewData";
import { Container, Typography } from "@mui/material";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionList/arePropsEqual";
import { listItemProps } from "@/app/util/components/submissions/questionSubmissionListItem/listItemProps";
import styles from "../styles";
import { useRecentSubmissions } from "@/app/stores/recentSubmissionsStore";
import {
  ElementPosProvider,
  useElementPos,
} from "@/app/util/providers/elementPosProvider";
export const recentQuestionSubmissionColumnNames = (width?: number) => {
  const largeWidthOrder: [string, keyof QuestionSubmission][] = [
    ["Submitted", "dateCreated"],
    ["Question", "questionName"],
    ["Type", "questionType"],
    ["Score", "score"],
    ["Time Elapsed", "time"],
  ];
  const smallWidthOrder: [string, keyof QuestionSubmission][] = [
    ["Question", "questionName"],
    ["Type", "questionType"],
    ["Score", "score"],
    ["Submitted", "dateCreated"],
    ["Elapsed", "time"],
  ];
  if (typeof width !== "number") return largeWidthOrder;
  if (width <= 600) return smallWidthOrder;
  return largeWidthOrder;
};

const determineListHeaderStyles = (width: number) => {
  const containerClasses = [...styles.header.container];
  const headerItemClasses = [...styles.header.text];
  const subHeaderContainerClasses = [...styles.header.subHeader.container];
  const subHeaderItemClasses = [...styles.header.subHeader.text];
  //for all but questions
  const subHeaderItemClassesGeneral = [...subHeaderItemClasses];
  const subHeaderItemQuestionClasses = [...subHeaderItemClasses];
  switch (true) {
    case width > 1000:
      subHeaderItemClassesGeneral.push("w-[9rem]");
      subHeaderItemQuestionClasses.push("w-[14rem]");
      break;
    case width > 800:
      subHeaderItemClassesGeneral.push("w-[7rem]");
      subHeaderItemQuestionClasses.push("w-[12rem]");
      break;
    case width > 700:
      subHeaderItemClassesGeneral.push("w-[6rem]");
      subHeaderItemQuestionClasses.push("w-[10rem]");
      break;
    case width > 600:
      subHeaderItemClassesGeneral.push("w-[5.5rem]");
      subHeaderItemQuestionClasses.push("w-[9rem]");
      // subHeaderItemClassesGeneral.push("w-full");
      // subHeaderItemQuestionClasses.push("w-full");
      break;
    case width > 400:
      // subHeaderItemClassesGeneral.push("w-full");
      // subHeaderItemQuestionClasses.push("w-full");
      break;
    case width > 300:
      break;
    default:
      break;
  }
  return {
    containerClasses,
    headerItemClasses,
    subHeaderContainerClasses,
    subHeaderItemClassesGeneral,
    subHeaderItemQuestionClasses,
  };
};
const RecentQuestionSubmissionListWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useElementPos();
  if (!value) return <></>;
  const { setRef } = value;
  return (
    <Container ref={setRef} className={`border px-0`}>
      {children}
    </Container>
  );
};
const QuestionSubmissionListHeader = () => {
  const position = useElementPos();
  const containerWidth = position?.position.width || 0;
  const {
    containerClasses,
    headerItemClasses,
    subHeaderContainerClasses,
    subHeaderItemClassesGeneral,
    subHeaderItemQuestionClasses,
  } = determineListHeaderStyles(containerWidth);
  return (
    <Container className={containerClasses.join(" ")}>
      <Container className="flex w-full border-b py-3 px-4">
        <Typography className={headerItemClasses.join(" ")}>
          Recent Submissions
        </Typography>
      </Container>
      {containerWidth > 600 && (
        <Container className={subHeaderContainerClasses.join(" ")}>
          {recentQuestionSubmissionColumnNames().map((column) => (
            <Typography
              className={
                column[0] === "Question"
                  ? subHeaderItemQuestionClasses.join(" ")
                  : subHeaderItemClassesGeneral.join(" ")
              }
              key={column[0]}
            >
              {column[0]}
            </Typography>
          ))}
        </Container>
      )}
    </Container>
  );
};
const QueststionSubmissionsDataList = ({
  data,
}: {
  data: Partial<QuestionSubmission>[];
}) => {
  return data.map((submission) => (
    <MemoizedQuestionSubmissionsListItem
      {...listItemProps(submission)}
      key={submission.id}
    />
  ));
};
const MemoizedQuestionSubmissionsDataList = memo(
  QueststionSubmissionsDataList,
  arePropsEqual
);
const RecentQuestionSubmissionsList = () => {
  const { data: session } = useSession();
  const [questionSubmissionsData, { addOrUpdateItems }] =
    useRecentSubmissions();
  const [getSubmission, { loading }] = useLazyQuery(
    QueryFullQuestionSubmissions
  );
  const questionSubmissions = questionSubmissionsData.data;
  const [cursor, setCursor] = useState(
    questionSubmissions.length > 0
      ? questionSubmissions[questionSubmissions.length - 1].id || null
      : null
  );
  const userId = session ? session.user.id : "";
  //memoized function to fetch new data
  const savedFetchSubmissionsFunc = useCallback(
    fetchItems({
      userId,
      getSubmission,
      cursor,
      setCursor,
      addOrUpdateItems,
      loading,
    }),
    [userId, getSubmission, cursor, setCursor, addOrUpdateItems, loading]
  );
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  const data = questionSubmissions;
  return (
    <Container className={styles.listContainer.container.join(" ")}>
      <PaginationWrapper
        hasMore={!!cursor}
        fetchMoreData={savedFetchSubmissionsFunc}
        dataLength={data ? data.length : 0}
        hasChildren
        scrollThreshold={0.8}
      >
        {data && data.length > 0 && data[0] ? (
          <MemoizedQuestionSubmissionsDataList
            data={data as Partial<QuestionSubmission>[]}
          />
        ) : (
          noDataPlaceholder
        )}
      </PaginationWrapper>
    </Container>
  );
};
const RecentQuestionSubmissionsListContainer = () => {
  return (
    <ElementPosProvider>
      <RecentQuestionSubmissionListWrapper>
        <QuestionSubmissionListHeader />
        <RecentQuestionSubmissionsList />
      </RecentQuestionSubmissionListWrapper>
    </ElementPosProvider>
  );
};
export default RecentQuestionSubmissionsListContainer;
