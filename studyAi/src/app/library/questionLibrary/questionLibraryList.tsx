"use client";
import { useQuestionLibraryData } from "./context/questionLibraryContext";
import QuestionsListContainer from "@/app/util/components/questionList/client/questionList";
import { useSession } from "next-auth/react";
import { determineSortQuery } from "./helpers/determineSortQuery";
import { determinePrivateQuery } from "./helpers/determinePrivateQuery";
import { determineCreatorIdQuery } from "./helpers/determineCreatorIdQuery";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
export const QuestionLibraryList = () => {
  const session = useSession();
  const libraryData = useQuestionLibraryData();
  if (!libraryData) return <></>;
  const {
    pageType,
    loading,
    cursor,
    questions,
    tabValue,
    getQuestions,
    setCursor,
    addOrUpdateItems,
    sortOrder,
    sortValue,
  } = libraryData;
  const fetchMoreData = async () => {
    if (loading) return;
    const queryOptions = {
      variables: {
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        skip: cursor ? 1 : 0,
        private: determinePrivateQuery(tabValue),
        creatorId: determineCreatorIdQuery(pageType, session),
        orderBy: determineSortQuery(sortValue, sortOrder),
      },
    };
    const { data: results } = await getQuestions(queryOptions);
    if (!results) {
      setCursor(null);
      return [];
    }
    const newQuestionArr = results.questions as QuestionStoreQuestionType[];
    if (newQuestionArr.length <= 0) {
      setCursor(null);
      return newQuestionArr;
    }
    //means we have new items to update
    const newNextCursor = newQuestionArr[newQuestionArr.length - 1].id;
    setCursor(newNextCursor || null);
    addOrUpdateItems(newQuestionArr);
    return newQuestionArr;
  };
  return (
    <QuestionsListContainer
      questions={questions}
      hasMore={!!cursor}
      fetchMoreData={fetchMoreData}
    />
  );
};
