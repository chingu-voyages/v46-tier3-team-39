"use client";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { SubmissionListProvider } from "./context/SubmissionsListProvider";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { useQuestionId } from "../../context/QuestionIdContext";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { memo, useCallback, useState } from "react";
import MemoizedQuestionSubmissionsListItem from "./QuestionSubmissionListItem";
import { useQuestions } from "@/app/stores/questionStore";
import { QuestionSubmission } from "@prisma/client";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import fetchItems from "./fetchNewData";
import { Container, Typography } from "@mui/material";
import { styles } from "./styles";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
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
  questionName,
}: {
  questionName: string;
  data: ArrOneOrMore<Partial<QuestionSubmission>>;
}) => {
  return data.map((submission) => (
    <MemoizedQuestionSubmissionsListItem
      questionName={questionName ? questionName : ""}
      key={submission.id}
      dateCreated={submission.dateCreated}
      id={submission.id}
      time={{
        id: submission.time?.id || "",
        timeTaken:
          typeof submission.time?.timeTaken === "number"
            ? submission.time.timeTaken
            : null,
        totalTimeGiven:
          typeof submission.time?.totalTimeGiven === "number"
            ? submission.time?.totalTimeGiven
            : null,
        timeType: submission.time?.timeType || "stopwatch",
      }}
      answerProvided={submission.answerProvided}
      score={submission.score}
    />
  ));
};
const MemoizedQuestionSubmissionsDataList = memo(
  QueststionSubmissionsDataList,
  (prevProps, newProps) => {
    const isDataEqual =
      prevProps.data.every((val, idx) => val.id === newProps.data[idx].id) &&
      prevProps.data.length === newProps.data.length;
    return prevProps.questionName === newProps.questionName && isDataEqual;
  }
);
const QuestionSubmissionsList = ({
  layout,
  containerId,
}: {
  containerId: string;
  layout: "page" | "tabbed";
}) => {
  const { data: session } = useSession();
  const questionIdData = useQuestionId();
  const questions = useQuestions()[0].data;
  const [questionSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const [getSubmission, {}] = useLazyQuery(QueryFullQuestionSubmissions);
  const questionSubmissionsArrMap = questionSubmissions.submittedData.arr;
  const questionId = questionIdData?.questionId;
  const currSubmissionsArr =
    questionId && questionSubmissionsArrMap[questionId]
      ? questionSubmissionsArrMap[questionId]
      : [];
  const [cursor, setCursor] = useState(
    currSubmissionsArr.length > 0 && currSubmissionsArr[0].id
      ? currSubmissionsArr[0].id
      : null
  );
  const userId = session ? session.user.id : "";
  //memoized functio n to fetch new data
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
    <SubmissionListProvider layout={layout}>
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
              questionName={questionName}
              data={data as ArrOneOrMore<Partial<QuestionSubmission>>}
            />
          ) : (
            noDataPlaceholder
          )}
        </PaginationWrapper>
      </div>
    </SubmissionListProvider>
  );
};
export default QuestionSubmissionsList;
