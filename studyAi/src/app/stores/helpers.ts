import { GetState, SetState } from "react-sweet-state";
import { cloneDeep } from "lodash";
import { SubmissionsData } from "../util/types/SubmissionsData";
import {
  addLocalStorageObj,
  deleteLocalStorageObj,
  getLocalStorageObj,
} from "@/app/util/parsers/localStorageWrappers";
import { QuestionSubmission } from "@prisma/client";
export const saveAnswerToLocalStorage = ({
  id,
  submission,
  submissionType,
}: {
  id: string;
  submission: Partial<QuestionSubmission>;
  submissionType: "question" | "quiz";
}) => {
  const key =
    submissionType === "question"
      ? `question-submission-${id}`
      : `quiz-submission-${id}`;
  addLocalStorageObj(key, submission);
};
export const deleteAnswerToLocalStorage = ({
  id,
  submissionType,
}: {
  id: string;
  submissionType: "question" | "quiz";
}) => {
  const key =
    submissionType === "question"
      ? `question-submission-${id}`
      : `quiz-submission-${id}`;
  deleteLocalStorageObj(key);
};
export const getAnswerFromLocalStorage = ({
  id,
  submissionType,
}: {
  id: string;
  submissionType: "question" | "quiz";
}) => {
  const key =
    submissionType === "question"
      ? `question-submission-${id}`
      : `quiz-submission-${id}`;
  return getLocalStorageObj<Partial<QuestionSubmission>>(key);
};
export const findById = <T>(arr: (T & { id: string })[], id: string) => {
  let idx = 0;
  for (let i in arr) {
    if (!(arr[i].id === id)) continue;
    idx = Number(i);
    break;
  }
  return idx;
};
export const addOrUpdateFunc = <T>({
  getState,
  items,
  setState,
}: {
  items: (T & { id: string })[];
  getState: GetState<{ data: { [key: string]: T & { id: string } } }>;
  setState: SetState<{ data: { [key: string]: T & { id: string } } }>;
}) => {
  const currState = getState();
  const arr = items.map((item) => {
    if (item.id in currState.data)
      return [
        item.id,
        {
          ...currState.data[item.id],
          ...item,
        },
      ];
    return [item.id, item];
  });
  const data = {
    ...currState.data,
    ...Object.assign({}, Object.fromEntries(arr)),
  };
  setState({
    data,
  });
  return data;
};
export const addOrUpdateSubmissionsFunc = <T>({
  items,
  getState,
  setState,
  submissionType,
}: {
  items: (T & { id?: string; questionId?: string; quizId?: string })[];
  getState: GetState<SubmissionsData<T>>;
  setState: SetState<SubmissionsData<T>>;
  submissionType: "ongoing" | "submitted";
}) => {
  const currState = getState();
  const copiedData = cloneDeep(currState) as SubmissionsData<T>;
  //go through items and update or add them
  items.forEach((item) => {
    const { id, questionId, quizId } = item;
    const submissionTypeId = questionId ? questionId : (quizId as string);
    const inOngoing =
      submissionType === "ongoing" || submissionTypeId in currState.ongoingData;
    const inSubmitted =
      submissionType === "submitted" ||
      submissionTypeId in currState.submittedData;
    if (inSubmitted && id) {
      let submissionMap = currState.submittedData.map[submissionTypeId];
      if (!submissionMap) {
        currState.submittedData.map[submissionTypeId] = {};
        submissionMap = currState.submittedData.map[submissionTypeId];
      }
      //check if we need to update
      const currItem = submissionMap[id];
      const newItem = currItem
        ? {
            ...currItem,
            ...item,
            id: id,
          }
        : { ...item, id };
      submissionMap[id] = newItem;
      //grab index of id in arr
      let arr = copiedData.submittedData.arr[submissionTypeId];
      if (!arr) {
        copiedData.submittedData.arr[submissionTypeId] = [];
        arr = copiedData.submittedData.arr[submissionTypeId];
      }
      let idx = findById(arr, newItem.id);
      copiedData.submittedData.arr[submissionTypeId][idx] = newItem;
    }
    if (inOngoing) {
      //check if we need to update
      const currItem = currState.ongoingData[submissionTypeId];
      const newItem = currItem
        ? {
            ...currItem,
            ...item,
          }
        : item;
      copiedData.ongoingData[submissionTypeId] = newItem;
    }
  });
  setState(copiedData);
};
export const deleteItems = <T>({
  items,
  getState,
  setState,
}: {
  items: string[];
  getState: GetState<{ data: { [key: string]: T & { id: string } } }>;
  setState: SetState<{ data: { [key: string]: T & { id: string } } }>;
}) => {
  const currData = getState();
  const copyData = cloneDeep(currData) as {
    data: { [key: string]: T & { id: string } };
  };
  items.forEach((itemId) => {
    if (itemId in currData.data) delete copyData.data["id"];
  });
  setState(copyData);
  return copyData;
};
export const deleteSubmissionItems = <T>({
  items,
  getState,
  setState,
}: {
  items: (T & { id?: string; questionId?: string; quizId?: string })[];
  getState: GetState<SubmissionsData<T>>;
  setState: SetState<SubmissionsData<T>>;
}) => {
  const currState = getState();
  const copiedData = cloneDeep(currState) as SubmissionsData<T>;
  items.forEach((item) => {
    const { id, questionId, quizId } = item;
    const submissionTypeId = questionId ? questionId : (quizId as string);
    const inOngoing = submissionTypeId in currState.ongoingData;
    const inSubmitted = submissionTypeId in currState.submittedData;
    const submissionMap = copiedData.submittedData.map[submissionTypeId];
    if (inOngoing && submissionTypeId in currState.ongoingData)
      delete currState.ongoingData[submissionTypeId];
    if (inSubmitted && id && submissionMap && id in submissionMap) {
      delete submissionMap[id];
      let arr = copiedData.submittedData.arr[submissionTypeId];
      if (!arr) {
        copiedData.submittedData.arr[submissionTypeId] = [];
        arr = copiedData.submittedData.arr[submissionTypeId];
      }
      let idx = findById(arr, id);
      //remove element
      arr.splice(idx, 1);
    }
  });
  setState(copiedData);
  return copiedData;
};
