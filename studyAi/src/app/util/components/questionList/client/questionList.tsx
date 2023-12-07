"use client";
import { Question } from "@prisma/client";
import PaginationWrapper from "../../pagination/paginationWrapper";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
import { memo } from "react";
import MemoizedQuestionListItem from "../server/questionListItem";
const QuestionList = ({ data }: { data: Partial<Question>[] }) => {
  return data.map((question, idx) => (
    <MemoizedQuestionListItem
      key={question.id}
      id={question.id ? question.id : idx.toString()}
      questionType={question.questionType}
      title={question.questionInfo?.title}
      accessKey={question.private}
      tags={question.tags}
    />
  ));
};
const MemoizedQuestionList = memo(QuestionList, (prevProps, nextProps) => {
  return (
    prevProps.data.every((prev, idx) => prev.id === nextProps.data[idx]?.id) &&
    prevProps.data.length === nextProps.data.length
  );
});
export default function QuestionsListContainer({
  questions,
  fetchMoreData,
  hasMore,
  scrollableTarget,
}: {
  questions: Partial<Question>[];
  fetchMoreData: () => Promise<QuestionStoreQuestionType[] | undefined>;
  hasMore: boolean;
  scrollableTarget?: string | React.ReactNode;
  }) {
  return (
    <PaginationWrapper
      fetchMoreData={fetchMoreData}
      hasMore={hasMore}
      dataLength={questions ? questions.length : 0}
      hasChildren
      scrollableTarget={scrollableTarget}
    >
      <MemoizedQuestionList data={questions} />
    </PaginationWrapper>
  );
}
