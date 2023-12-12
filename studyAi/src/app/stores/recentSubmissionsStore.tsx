"use client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { QuestionSubmission } from "@prisma/client";
import { useRef } from "react";
import { useIsClient } from "../util/providers/isClientProvider";
import removeDuplicatesUsingId from "../util/parsers/removeDuplicateUsingId";
import { handleCursor } from "@/app/util/components/pagination/handleCursor";
export type QuestionSubmissionsData = Partial<QuestionSubmission> & {
  id: string;
};
const initialState: { data: QuestionSubmissionsData[] } = {
  data: [],
};
export type QuestionSubmissionStoreSubmissionType =
  Partial<QuestionSubmission> & {
    id: string;
  };
export type QuestionSubmissionContainerProps = {
  initialItems: QuestionSubmissionStoreSubmissionType[];
  questionId?: string;
  children: React.ReactNode;
};
export const RecentQuestionSubmissionContainer =
  createContainer<QuestionSubmissionContainerProps>();
const Store = createStore({
  containedBy: RecentQuestionSubmissionContainer,
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      (
        items: QuestionSubmissionStoreSubmissionType[],
        submissionType: "ongoing" | "submitted",
        setCursor?: React.Dispatch<React.SetStateAction<string | null>>
      ) =>
      ({ setState, getState }) => {
        const updatedItems = items;
        const prev = getState();
        const mergedArr = [...prev.data, ...updatedItems];
        const newArr = removeDuplicatesUsingId(mergedArr);
        if (setCursor) {
          handleCursor({
            newArr,
            setCursor,
          });
        }
        setState({ data: newArr });
        return newArr;
      },
  },
  handlers: {
    onInit:
      () =>
      ({ setState }, { initialItems, children }) => {
        setState({ data: initialItems });
      },
  },
  // optional, unique, mostly used for easy debugging
  name: "recentQuestionSubmissions",
});
export const useRecentSubmissions = createHook(Store);

export const RecentQuestionSubmissionsContainerWrapper = ({
  children,
  initialItems,
}: QuestionSubmissionContainerProps) => {
  const initData = useRef(initialItems ? initialItems : []);
  const isClient = useIsClient();
  if (!isClient) return <></>;
  //ensures we only render container with hydration when on client side
  return (
    <RecentQuestionSubmissionContainer initialItems={initData.current}>
      {children}
    </RecentQuestionSubmissionContainer>
  );
};
