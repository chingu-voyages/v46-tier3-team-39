"use client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { addOrUpdateSubmissionsFunc, deleteSubmissionItems } from "./helpers";
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
    id: string;
  })[];
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
        })[]
      ) =>
      async ({ setState, getState }) =>
        addOrUpdateSubmissionsFunc({
          items,
          setState,
          getState,
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
      ({ setState, getState }, { initialItems, children }) =>
        addOrUpdateSubmissionsFunc({
          items: initialItems,
          setState,
          getState,
        }),
  },
  // optional, unique, mostly used for easy debugging
  name: "questionSubmissions",
});

export const useQuestionSubmissions = createHook(Store);
