"use client";
import { createStore, createHook } from "react-sweet-state";
import { addOrUpdateFunc, deleteItems } from "./helpers";
import { QuestionSubmission } from "../../../prisma/generated/type-graphql";
type QuestionSubmissionsData = {
  submittedData: {
    map: {
      //mapped to question ids but stored as key-data store (useful for rendering individual submissions)
      [key: string]: {
        //mapped to submission ids
        [key: string]: Partial<QuestionSubmission> & {
          questionId: string;
          id: string;
        };
      };
    };
    arr: {
      //mapped to question ids, but stored as an array (useful for rendering lists)
      [key: string]: (Partial<QuestionSubmission> & {
        questionId: string;
        id: string;
      })[];
    };
  };
  //user is currently working
  //on item, but has not submitted yet
  ongoingData: {
    //mapped to question ids
    [key: string]: Partial<QuestionSubmission> & {
      questionId: string;
      id: string;
    };
  };
};
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
    // addOrUpdateItems:
    //   () =>
    //   async (
    //     { setState, getState },
    //     items: (Partial<QuestionSubmission> & { id: string })[]
    //   ) =>
    //     addOrUpdateFunc({
    //       items,
    //       setState,
    //       getState,
    //     }),
    // deleteItems:
    //   () =>
    //   async ({ setState, getState }, items: QuestionSubmission["id"][]) =>
    //     deleteItems({ items, setState, getState }),
  },
  // optional, unique, mostly used for easy debugging
  name: "questionSubmissions",
});

export const useQuestionSubmissions = createHook(Store);
