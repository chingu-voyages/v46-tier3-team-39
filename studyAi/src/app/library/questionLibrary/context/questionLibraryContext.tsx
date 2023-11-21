"use client";
import {
  QuestionStoreQuestionType,
  QuestionsData,
  useQuestions,
} from "@/app/stores/questionStore";
import {
  ApolloError,
  LazyQueryExecFunction,
  useLazyQuery,
} from "@apollo/client";
import React, { createContext, useContext, useState } from "react";
import {
  BoolFilter,
  DateTimeFilter,
  Exact,
  GetQuestionsInfoQuery,
  InputMaybe,
  QuestionOrderByWithRelationInput,
  QuestionWhereUniqueInput,
  SortOrder,
  StringFilter,
} from "../../../../../graphql/generated/graphql";
import { GetQuestionsInfo } from "@/gql/queries/questionQueries";
export type QuestionLibraryContextData = {
  pageType: "user" | "public";
  error: ApolloError | undefined;
  questions: QuestionStoreQuestionType[];
  tabValue: "All" | "Public" | "Private";
  setTabValue: React.Dispatch<
    React.SetStateAction<"All" | "Public" | "Private">
  >;
  addOrUpdateItems: (
    items: QuestionStoreQuestionType[]
  ) => QuestionsData["data"];
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortValue: "title" | "date" | "likes";
  setSortValue: React.Dispatch<
    React.SetStateAction<"title" | "date" | "likes">
  >;
  cursor: string | null;
  setCursor: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  resetItems: (items: QuestionStoreQuestionType[]) => void;
  getQuestions: LazyQueryExecFunction<
    GetQuestionsInfoQuery,
    Exact<{
      dateQuery?: InputMaybe<DateTimeFilter>;
      cursor?: InputMaybe<QuestionWhereUniqueInput>;
      skip?: InputMaybe<number>;
      private?: InputMaybe<BoolFilter>;
      creatorId?: InputMaybe<StringFilter>;
      orderBy?: InputMaybe<
        QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
      >;
    }>
  >;
};
//data context
const QuestionLibraryContext = createContext<QuestionLibraryContextData | null>(
  null
);
export const QuestionLibraryProvider = ({
  children,
  pageType,
}: {
  pageType: "user" | "public";
  children: React.ReactNode;
}) => {
  const [tabValue, setTabValue] = useState<"All" | "Public" | "Private">(
    pageType === "public" ? "Public" : "All"
  );
  const [questionsData, { resetItems, addOrUpdateItems }] = useQuestions();
  const [getQuestions, { loading, error }] = useLazyQuery(GetQuestionsInfo);
  const questions = questionsData.data.arr;
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const [sortValue, setSortValue] = useState<"title" | "date" | "likes">(
    "date"
  );
  const [cursor, setCursor] = useState<string | null>(
    questions.length > 0 ? questions[questions.length - 1].id || null : null
  );
  return (
    <QuestionLibraryContext.Provider
      value={{
        pageType,
        error,
        questions,
        tabValue,
        setTabValue,
        sortOrder,
        setSortOrder,
        sortValue,
        setSortValue,
        cursor,
        setCursor,
        loading,
        resetItems,
        getQuestions,
        addOrUpdateItems,
      }}
    >
      {children}
    </QuestionLibraryContext.Provider>
  );
};
export const useQuestionLibraryData = () => useContext(QuestionLibraryContext);
