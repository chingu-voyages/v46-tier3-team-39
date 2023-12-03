"use client";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { useQuestionId } from "../../context/QuestionIdContext";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { memo, useCallback, useState } from "react";
import MemoizedQuestionSubmissionsListItem from "./QuestionSubmissionListItem";
import { useQuestions } from "@/app/stores/questionStore";
import { QuestionSubmission } from "@prisma/client";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import fetchItems from "@/app/util/components/submissions/questionSubmissionPagination/fetchNewData";
import { Container, Typography } from "@mui/material";
import { styles } from "./styles";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionList/arePropsEqual";
import { listItemProps } from "@/app/util/components/submissions/questionSubmissionListItem/listItemProps";
type ArrOneOrMore<T> = [T, ...T[]];
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
    <MemoizedQuestionSubmissionsListItem {...listItemProps(submission)} key={submission.id} />
  ));
};
const MemoizedQuestionSubmissionsDataList = memo(
  QueststionSubmissionsDataList,
  arePropsEqual
);
const QuestionSubmissionsList = ({ containerId }: { containerId: string }) => {
  const { data: session } = useSession();
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const questions = useQuestions()[0].data;
  const [questionSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
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
      questionId,
      getSubmission,
      cursor,
      setCursor,
      addOrUpdateItems,
    }),
    [userId, questionId, getSubmission, cursor, setCursor, addOrUpdateItems]
  );
  const question = questionId ? questions.map[questionId] : null;
  const questionName = question?.questionInfo?.title;
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  if (!questionId) return noDataPlaceholder;
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
export default QuestionSubmissionsList;
