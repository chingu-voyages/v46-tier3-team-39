"use client";
import { memo, useCallback, useState } from "react";
import { QuestionSubmission } from "@prisma/client";
import MemoizedQuestionSubmissionPageListItem from "./QuestionSubmissionPageListItem";
import { useSession } from "next-auth/react";
import { useLazyQuery } from "@apollo/client";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { useQuestionSubmissionsAnyQuestion } from "@/app/stores/questionSubmissionsStoreAnyQuestion";
import fetchItems from "@/app/util/components/submissions/questionSubmissionPagination/fetchNewData";
import PaginationWrapper from "@/app/util/components/pagination/paginationWrapper";
import { arePropsEqual } from "@/app/util/components/submissions/questionSubmissionList/arePropsEqual";
import { listItemProps } from "@/app/util/components/submissions/questionSubmissionListItem/listItemProps";
import QuestionSubmissionPageHeader from "../server/QuestionSubmissionPageHeader";
const QuestionSubmissionsPageListData = ({
  data,
}: {
  data: Partial<QuestionSubmission>[];
}) =>
  data.map((submission) => (
    <MemoizedQuestionSubmissionPageListItem {...listItemProps(submission)} />
  ));

export const MemoizedQuestionSubmissionsPageListData = memo(
  QuestionSubmissionsPageListData,
  arePropsEqual
);

const QuestionSubmissionsPageList = () => {
  const { data: session } = useSession();
  const [
    {
      submittedData: { arr: currSubmissionsArr },
    },
    { addOrUpdateItems },
  ] = useQuestionSubmissionsAnyQuestion();
  const [getSubmissions, {loading}] = useLazyQuery(QueryFullQuestionSubmissions);
  const [cursor, setCursor] = useState(
    currSubmissionsArr.length > 0
      ? currSubmissionsArr[currSubmissionsArr.length - 1].id || null
      : null
  );
  const userId = session ? session.user.id : "";
  const savedFetchSubmissionsFunc = useCallback(
    fetchItems({
      userId,
      getSubmission: getSubmissions,
      cursor,
      setCursor,
      addOrUpdateItems,
      loading
    }),
    [userId, getSubmissions, cursor, setCursor, addOrUpdateItems]
  );
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  return (
    <>
      <QuestionSubmissionPageHeader />
      <PaginationWrapper
        hasMore={!!cursor}
        fetchMoreData={savedFetchSubmissionsFunc}
        dataLength={currSubmissionsArr ? currSubmissionsArr.length : 0}
        hasChildren
      >
        {currSubmissionsArr && currSubmissionsArr.length > 0 ? (
          <MemoizedQuestionSubmissionsPageListData data={currSubmissionsArr} />
        ) : (
          noDataPlaceholder
        )}
      </PaginationWrapper>
    </>
  );
};
export default QuestionSubmissionsPageList;
