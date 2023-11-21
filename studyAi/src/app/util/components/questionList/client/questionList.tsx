"use client";
import { Question } from "@prisma/client";
import PaginationWrapper from "../../pagination/paginationWrapper";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
import { memo } from "react";
import MemoizedQuestionListItem from "./questionListItem";
const QuestionList = ({ data }: { data: Partial<Question>[] }) => {
  return (
    <>
      {data.map((question, idx) => (
        <MemoizedQuestionListItem
          key={question.id}
          id={question.id ? question.id : idx.toString()}
          questionType={question.questionType}
          title={question.questionInfo?.title}
          accessKey={question.private}
          tags={question.tags}
        />
      ))}
    </>
  );
};
const MemoizedQuestionList = memo(QuestionList);
export default function QuestionsListContainer({
  questions,
  fetchMoreData,
  hasMore,
}: {
  questions: Partial<Question>[];
  fetchMoreData: () => Promise<QuestionStoreQuestionType[]>;
  hasMore: boolean;
}) {
  return (
    <PaginationWrapper
      fetchMoreData={fetchMoreData}
      hasMore={hasMore}
      dataLength={questions ? questions.length : 0}
      hasChildren
    >
      <MemoizedQuestionList data={questions} />
    </PaginationWrapper>
  );
}
