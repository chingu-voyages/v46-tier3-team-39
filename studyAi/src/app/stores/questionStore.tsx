"use client";
import { Question } from "@prisma/client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { addOrUpdateFunc, deleteItems } from "./helpers";
type QuestionsData = {
  data: {
    map: { [key: string]: Partial<Question> & { id: string } };
    arr: (Partial<Question> & { id: string })[];
  };
};
const initialState: QuestionsData = {
  data: {
    map: {},
    arr: [],
  },
};
export const QuestionsContainer = createContainer<{
  initialItems: (Partial<Question> & { id: string })[];
  children: React.ReactNode;
}>();
const Store = createStore({
  containedBy: QuestionsContainer,
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      (items: (Partial<Question> & { id: string })[]) =>
      async (
        { setState, getState }
      ) =>
        addOrUpdateFunc({
          items,
          setState,
          getState,
        }),
    deleteItems:
      ( items: Question["id"][]) =>
      async ({ setState, getState }) =>
        deleteItems({ items, setState, getState }),
  },
  handlers: {
    onInit:
      () =>
      ({ setState, getState }, { initialItems, children }) =>
        addOrUpdateFunc({
          items: initialItems,
          setState,
          getState,
        }),
  },
  // optional, unique, mostly used for easy debugging
  name: "questions",
});

export const useQuestions = createHook(Store);