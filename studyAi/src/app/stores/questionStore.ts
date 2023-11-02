import { Question } from "@prisma/client";
import { createStore, createHook, createContainer } from "react-sweet-state";
import { addOrUpdateFunc, deleteItems } from "./helpers";
type QuestionsData = {
  data: { [key: string]: Partial<Question> & { id: string } };
};
const initialState: QuestionsData = {
  data: {},
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
  name: "questions",
});
const QuestionsContainer = createContainer(Store, {
  onInit:
    () =>
    ({ setState }, initialState: QuestionsData) =>
      setState(initialState),
});

const useQuestions = createHook(Store);
export { QuestionsContainer, useQuestions };
