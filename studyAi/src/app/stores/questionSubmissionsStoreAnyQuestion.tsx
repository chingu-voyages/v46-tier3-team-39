"use client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { addOrUpdateSubmissionsAnyParentFunc } from "./helpers";
import { QuestionSubmission } from "@prisma/client";
import { SubmissionsDataAnyParentItem } from "../util/types/SubmissionsData";
import { QuestionSubmissionStoreSubmissionType } from "./questionSubmissionsStore";
import { useRef } from "react";
import { useIsClient } from "../util/providers/isClientProvider";
export type QuestionSubmissionsData = SubmissionsDataAnyParentItem<
  Partial<QuestionSubmission>
>;
const initialState: QuestionSubmissionsData = {
  submittedData: {
    map: {},
    arr: [],
  },
  ongoingData: {
    map: {},
    arr: [],
  },
};
export type QuestionSubmissionStoreSubmissionAnyParentType =
  QuestionSubmissionStoreSubmissionType & { id: string };
export type QuestionSubmissionContainerProps = {
  initialItems: QuestionSubmissionStoreSubmissionAnyParentType[];
  questionId?: string;
  children: React.ReactNode;
};
export const QuestionSubmissionsAnyParentContainer =
  createContainer<QuestionSubmissionContainerProps>();
const Store = createStore({
  containedBy: QuestionSubmissionsAnyParentContainer,
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      (
        items: QuestionSubmissionStoreSubmissionAnyParentType[],
        submissionType: "ongoing" | "submitted"
      ) =>
      ({ setState, getState }) =>
        addOrUpdateSubmissionsAnyParentFunc({
          items,
          setState,
          getState,
          submissionType: "question",
          submissionTimeType: submissionType,
        }),
    resetItems:
      (
        items: QuestionSubmissionStoreSubmissionAnyParentType[],
        submissionType: "ongoing" | "submitted"
      ) =>
      ({ setState, getState }) => {
        const newState = {
          ongoingData: {
            map: {},
            arr: (submissionType === "ongoing" && items) || [],
          },
          submittedData: {
            map: {},
            arr: (submissionType === "submitted" && items) || [],
          },
        };
        setState(newState);
      },
    // deleteItems:
    //   (items: QuestionSubmissionStoreSubmissionType[]) =>
    //   ({ setState, getState }) =>
    //     deleteSubmissionItems({ items, setState, getState }),
  },
  handlers: {
    onInit:
      () =>
      ({ setState, getState }, { initialItems, children }) => {
        //these also set states, but their end result doesn't
        //matter, except that we will be updating state twice
        //unneccesarily
        const submittedData = addOrUpdateSubmissionsAnyParentFunc({
          items: initialItems,
          setState,
          getState,
          submissionType: "question",
          submissionTimeType: "submitted",
        });
        //this sets correct state at the end
        // const ongoingData = addOrUpdateSubmissionsFunc({
        //   items: initial,
        //   setState,
        //   getState,
        //   submissionType: "question",
        //   submissionTimeType: "ongoing",
        // });
        // setState({
        //   ongoingData: ongoingData.ongoingData,
        //   submittedData: submittedData.submittedData,
        // });
      },
  },
  // optional, unique, mostly used for easy debugging
  name: "questionSubmissionsAnyQuestion",
});
export const QuestionSubmissionsAnyQuestionContainerWrapper = ({
  questionId,
  children,
  initialItems,
}: QuestionSubmissionContainerProps) => {
  const initData = useRef(initialItems ? initialItems : []);
  const isClient = useIsClient();
  if (!isClient) return <></>;
  //ensures we only render container with hydration when on client side
  return (
    <QuestionSubmissionsAnyParentContainer
      initialItems={initData.current}
      questionId={questionId}
    >
      {children}
    </QuestionSubmissionsAnyParentContainer>
  );
};
export const useQuestionSubmissionsAnyQuestion = createHook(Store);
