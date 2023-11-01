"use client";
import { Question } from "@prisma/client";
import { createStore, createHook } from "react-sweet-state";
import { addOrUpdateFunc, deleteItems } from "./helpers";
import { QuestionSubmission } from "../../../prisma/generated/type-graphql";
type SubmissionsData = {
  submittedData: {
    //mapped to question ids
    [key: string]: {
      //mapped to submission ids
      [key: string]: Partial<QuestionSubmission> & { questionId: string; id: string };
    };
  };
  //user is currently working 
  //on item, but has not submitted yet
  ongoingData: {
    //mapped to question ids
    [key: string]: Partial<QuestionSubmission> & { questionId: string; id: string };
  };
};
const initialState: SubmissionsData = {
  submittedData: {},
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
        items: (Partial<Question> & { id: string })[]
      ) =>
        addOrUpdateFunc({
          items,
          setState,
          getState,
        }),
    deleteItems:
      () =>
      async ({ setState, getState }, items: Question["id"][]) =>
        deleteItems({ items, setState, getState }),
  },
  // optional, unique, mostly used for easy debugging
  name: "submissions",
});

export const useQuestions = createHook(Store);
