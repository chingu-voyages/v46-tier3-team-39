"use client";
import { createStore, createHook } from "react-sweet-state";
import { addOrUpdateSubmissionsFunc, deleteSubmissionItems } from "./helpers";
import { QuestionSubmission } from "../../../prisma/generated/type-graphql";
export type SubmissionsData<T> = {
  submittedData: {
    map: {
      //mapped to question ids but stored as key-data store (useful for rendering individual submissions)
      [key: string]: {
        //mapped to submission ids
        [key: string]: Partial<T> & {
          questionId?: string;
          quizId?: string;
          id: string;
        };
      };
    };
    arr: {
      //mapped to question ids, but stored as an array (useful for rendering lists)
      [key: string]: (Partial<T> & {
        questionId?: string;
        quizId?: string;
        id: string;
      })[];
    };
  };
  ongoingData: {
    //mapped to submission ids
    [key: string]: Partial<T> & {
      questionId?: string;
      quizId?: string;
      id: string;
    };
  };
};
export type QuestionSubmissionsData = SubmissionsData<QuestionSubmission>;
const initialState: QuestionSubmissionsData = {
  submittedData: {
    map: {},
    arr: {},
  },
  ongoingData: {},
};
const Store = createStore({
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      () =>
      async (
        { setState, getState },
        items: (Partial<QuestionSubmission> & {
          questionId?: string;
          quizId?: string;
          id: string;
        })[]
      ) =>
        addOrUpdateSubmissionsFunc({
          items,
          setState,
          getState,
        }),
    deleteItems:
      () =>
      async (
        { setState, getState },
        items: Partial<QuestionSubmission> &
          {
            questionId?: string;
            quizId?: string;
            id: string;
          }[]
      ) =>
        deleteSubmissionItems({ items, setState, getState }),
  },
  // optional, unique, mostly used for easy debugging
  name: "questionSubmissions",
});

export const useQuestionSubmissions = createHook(Store);
