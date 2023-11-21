"use client";
import { Question } from "@prisma/client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { addOrUpdateFunc, deleteItems } from "./helpers";
export type QuestionStoreQuestionType = Partial<Question> & { id: string };
export type QuestionsData = {
  data: {
    map: { [key: string]: Partial<Question> & { id: string } };
    arr: QuestionStoreQuestionType[];
  };
};
const initialState: QuestionsData = {
  data: {
    map: {},
    arr: [],
  },
};
export const QuestionsContainer = createContainer<{
  initialItems: QuestionStoreQuestionType[];
  children: React.ReactNode;
}>();
const Store = createStore({
  containedBy: QuestionsContainer,
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addOrUpdateItems:
      (items: QuestionStoreQuestionType[]) =>
      ({ setState, getState }) =>
        addOrUpdateFunc({
          items,
          setState,
          getState,
        }),
    deleteItems:
      (items: Question["id"][]) =>
      ({ setState, getState }) =>
        deleteItems({ items, setState, getState }),
    resetItems:
      (items: QuestionStoreQuestionType[]) =>
      ({ setState }) => {
        if (items.length <= 0)
          return setState({
            data: {
              map: {},
              arr: [],
            },
          });
        const newState = {
          data: {
            map: Object.assign(
              {},
              Object.fromEntries(items.map((val) => [val.id, val]))
            ),
            arr: items,
          },
        };
        setState(newState);
      },
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
