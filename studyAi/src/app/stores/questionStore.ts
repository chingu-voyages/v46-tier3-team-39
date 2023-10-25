import { Question } from "@prisma/client";
import { createStore, createHook, createContainer } from "react-sweet-state";
type QuestionsData = {
  data: { [key: string]: Partial<Question> };
  status: "loading" | "success" | "failed";
};
const initialState: QuestionsData = {
  data: {},
  status: "success",
};
const Store = createStore({
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions: {
    addItems:
      () =>
        async ({ setState, getState }, api: {
          url: string;
          body: string; 
        }) => {
        
      },
    deleteItems:
      () =>
      async ({ setState, getState }) => {},
    updateItems:
      () =>
      async ({ setState, getState }) => {},
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