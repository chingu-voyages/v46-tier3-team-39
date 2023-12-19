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
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionList/arePropsEqual";
import { listItemProps } from "@/app/util/components/submissions/questionSubmissionListItem/listItemProps";
import styles from "../styles";
import { useRecentSubmissions } from "@/app/stores/recentSubmissionsStore";
const QuestionSubmissionListHeader = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;
  const containerClasses = [...styles.header.container];
  const headerItemClasses = [...styles.header.text];
  const subHeaderContainerClasses = [...styles.header.subHeader.container];
  const subHeaderItemClasses = [...styles.header.subHeader.text];
  //for all but questions
  const subHeaderItemClassesGeneral = [...subHeaderItemClasses, "min-w-[7rem]"];
  const subHeaderItemQuestionClasses = [
    ...subHeaderItemClasses,
    "min-w-[9rem]",
  ];
  return (
    <Container className={containerClasses.join(" ")}>
      <Container className="flex w-full border-b py-3 px-4">
        <Typography className={headerItemClasses.join(" ")}>
          Recent Submissions
        </Typography>
      </Container>
      <Container className={subHeaderContainerClasses.join(" ")}>
        <Typography className={subHeaderItemClassesGeneral.join(" ")}>
          Submitted
        </Typography>
        <Typography className={subHeaderItemQuestionClasses.join(" ")}>
          Question
        </Typography>
        <Typography className={subHeaderItemClassesGeneral.join(" ")}>
          Type
        </Typography>
        <Typography className={subHeaderItemClassesGeneral.join(" ")}>
          Score
        </Typography>
        <Typography className={subHeaderItemClassesGeneral.join(" ")}>
          Time Elapsed
        </Typography>
      </Container>
      {/* {!isMobile && (
        <Typography className={itemClasses.join(" ")}>Submitted</Typography>
      )} */}
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
  const questionSubmissions = questionSubmissionsData.data;
  const [getSubmission, { loading }] = useLazyQuery(
    QueryFullQuestionSubmissions
  );
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
    <Container className="border px-0">
      <QuestionSubmissionListHeader />
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
    </Container>
  );
};
export default RecentQuestionSubmissionsList;
