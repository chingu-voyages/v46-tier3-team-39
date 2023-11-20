"use client";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { SubmissionListProvider } from "./context/SubmissionsListProvider";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { useQuestionId } from "../../context/QuestionIdContext";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { SortOrder } from "../../../../../../graphql/generated/graphql";
import { memo, useCallback, useState } from "react";
import MemoizedQuestionSubmissionsListItem from "./QuestionSubmissionListItem";
import { useQuestions } from "@/app/stores/questionStore";
import { QuestionSubmission } from "@prisma/client";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
type ArrOneOrMore<T> = [T, ...T[]];
const SubmissionList = ({
  data,
  questionName,
}: {
  questionName: string;
  data: ArrOneOrMore<Partial<QuestionSubmission>>;
}) => {
  return (
    <>
      {data.map((submission) => (
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
          score={submission.score}
        />
      ))}
    </>
  );
};
const MemoizedSubmissionsList = memo(SubmissionList);
const QuestionSubmissionsList = ({ layout }: { layout: "page" | "tabbed" }) => {
  const { data: session } = useSession();
  const questionIdData = useQuestionId();
  const questions = useQuestions()[0].data;
  const [questionSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const [getSubmission, { data: submissionsData }] = useLazyQuery(
    QueryFullQuestionSubmissions
  );
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
  const question = questionId ? questions.map[questionId] : null;
  const questionName = question?.questionInfo?.title;
  //add skip and cursor logic
  const fetchItems = useCallback(async () => {
    const queryOptions = {
      variables: {
        questionId: { equals: questionId === "string" ? questionId : "" },
        userId: userId,
        cursor: {
          id: cursor,
        },
        skip: cursor ? 1 : null,
        orderBy: {
          dateCreated: "desc" as SortOrder,
        },
      },
    };
    const { data: results } = await getSubmission(queryOptions);
    if (!results) return;
    return addOrUpdateItems(
      results.questionSubmissions as (Partial<QuestionSubmission> & {
        id: string;
        questionId: string;
      })[],
      "submitted"
    );
  }, [userId, questionId, addOrUpdateItems]);
  if (!questionId) return <></>;
  const data = questionSubmissionsArrMap[questionId];
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  return (
    <SubmissionListProvider layout={layout}>
      <PaginationWrapper
        hasMore={
          submissionsData?.questionSubmissions
            ? submissionsData.questionSubmissions.length > 0
            : false
        }
        fetchMoreData={fetchItems}
        dataLength={data ? data.length : 0}
      >
        {questionName && data && data.length > 0 && data[0] ? (
          <MemoizedSubmissionsList
            questionName={questionName}
            data={data as ArrOneOrMore<Partial<QuestionSubmission>>}
          />
        ) : (
          noDataPlaceholder
        )}
      </PaginationWrapper>
    </SubmissionListProvider>
  );
};
export default QuestionSubmissionsList;
