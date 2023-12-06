"use client";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import MemoizedQuestionSubmissionsListItem from "./QuestionSubmissionsListItem";
import { QuestionSubmission } from "@prisma/client";
import fetchItems from "@/app/util/components/submissions/questionSubmissionPagination/fetchNewData";
import { Container, Typography } from "@mui/material";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionList/arePropsEqual";
import { listItemProps } from "@/app/util/components/submissions/questionSubmissionListItem/listItemProps";
import styles from "../styles";
type ArrOneOrMore<T> = [T, ...T[]];
const addOrUpdateItems =
  (
    setQuestionSubmissions: Dispatch<
      SetStateAction<Partial<QuestionSubmission>[]>
    >
  ) =>
  (
    items: {
      id: string;
    }[],
    type: "ongoing" | "submitted"
  ) => {};
const QuestionSubmissionListHeader = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;
  const containerClasses = [...styles.header.container];
  const itemClasses = [...styles.header.text];
  return (
    <Container className={containerClasses.join(" ")}>
      <Typography className={itemClasses.join(" ")}>Score</Typography>
      <Typography className={itemClasses.join(" ")}>Time Elapsed</Typography>
      {!isMobile && (
        <Typography className={itemClasses.join(" ")}>Submitted</Typography>
      )}
    </Container>
  );
};
const QueststionSubmissionsDataList = ({
  data,
}: {
  data: ArrOneOrMore<Partial<QuestionSubmission>>;
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
const RecentQuestionSubmissionsList = ({
  initialData,
}: {
  initialData?: Partial<QuestionSubmission>[];
}) => {
  const { data: session } = useSession();
  const [questionSubmissions, setQuestionSubmissions] = useState(
    initialData || []
  );
  // const [questionSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const [getSubmission, {}] = useLazyQuery(QueryFullQuestionSubmissions);
  const questionSubmissionsArrMap = questionSubmissions.submittedData.arr;
  const currSubmissionsArr =
    questionId && questionSubmissionsArrMap[questionId]
      ? questionSubmissionsArrMap[questionId]
      : [];
  const [cursor, setCursor] = useState(
    currSubmissionsArr.length > 0
      ? currSubmissionsArr[currSubmissionsArr.length - 1].id || null
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
      addOrUpdateItems: addOrUpdateItems(setQuestionSubmissions),
    }),
    [userId, getSubmission, cursor, setCursor]
  );
  const question = questionId ? questions.map[questionId] : null;
  const questionName = question?.questionInfo?.title;
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  const data = questionSubmissionsArrMap[questionId];
  return (
    <>
      <QuestionSubmissionListHeader />
      <div className={styles.listContainer.container.join(" ")}>
        <PaginationWrapper
          hasMore={!!cursor}
          fetchMoreData={savedFetchSubmissionsFunc}
          dataLength={data ? data.length : 0}
          hasChildren
          scrollableTarget={containerId}
        >
          {questionName && data && data.length > 0 && data[0] ? (
            <MemoizedQuestionSubmissionsDataList
              data={data as ArrOneOrMore<Partial<QuestionSubmission>>}
            />
          ) : (
            noDataPlaceholder
          )}
        </PaginationWrapper>
      </div>
    </>
  );
};
export default RecentQuestionSubmissionsList;
