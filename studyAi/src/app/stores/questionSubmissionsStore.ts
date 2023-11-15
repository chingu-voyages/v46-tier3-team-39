"use client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import {
  addOrUpdateSubmissionsFunc,
  deleteSubmissionItems,
  getAnswerFromLocalStorage,
} from "./helpers";
import { QuestionSubmission } from "@prisma/client";
import { SubmissionsData } from "../util/types/SubmissionsData";
export type QuestionSubmissionsData = SubmissionsData<QuestionSubmission>;
const initialState: QuestionSubmissionsData = {
  submittedData: {
    map: {},
    arr: {},
  },
  ongoingData: {},
};
export const QuestionSubmissionsContainer = createContainer<{
  initialItems: (Partial<QuestionSubmission> & {
    questionId: string;
    id?: string;
  })[];
  questionId?: string;
  children: React.ReactNode;
}>();
const Store = createStore({
  containedBy: QuestionSubmissionsContainer,
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      (
        items: (Partial<QuestionSubmission> & {
          questionId: string;
          id?: string;
        })[],
        submissionType: "ongoing" | "submitted"
      ) =>
      async ({ setState, getState }) =>
        addOrUpdateSubmissionsFunc({
          items,
          setState,
          getState,
          submissionType: "question",
          submissionTimeType: submissionType,
        }),
    deleteItems:
      (
        items: Partial<QuestionSubmission> &
          {
            questionId: string;
            id?: string;
          }[]
      ) =>
      async ({ setState, getState }) =>
        deleteSubmissionItems({ items, setState, getState }),
  },
  handlers: {
    onInit:
      () =>
      ({ setState, getState }, { initialItems, questionId, children }) => {
        //grab local state submission
        let initial = initialItems;
        const savedSubmission = questionId
          ? getAnswerFromLocalStorage({
              id: questionId,
              submissionType: "question",
            })
          : null;
        console.log(savedSubmission, 'saved');
        if (initialItems.length <= 0) {
          initial =
            savedSubmission && questionId
              ? [
                  {
                    ...savedSubmission,
                    questionId,
                  },
                ]
              : [];
        }
        addOrUpdateSubmissionsFunc({
          items: initial,
          setState,
          getState,
          submissionType: "question",
          submissionTimeType: "submitted",
        });
      },
  },
  // optional, unique, mostly used for easy debugging
  name: "questionSubmissions",
});

export const useQuestionSubmissions = createHook(Store);
