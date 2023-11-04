import { GetState, SetState } from "react-sweet-state";
import { cloneDeep } from "lodash";
import { SubmissionsData } from "./submissionsStore";
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
}: {
  items: (T & { id: string; questionId?: string; quizId?: string })[];
  getState: GetState<SubmissionsData<T>>;
  setState: SetState<SubmissionsData<T>>;
}) => {
  const currState = getState();
  const copiedData = cloneDeep(currState) as SubmissionsData<T>;
  //go through items and update or add them
  items.forEach((item) => {
    const { id, questionId, quizId } = item;
    const submissionTypeId = questionId ? questionId : (quizId as string);
    const inOngoing = submissionTypeId in currState.ongoingData;
    const inSubmitted = submissionTypeId in currState.submittedData;
    if (inSubmitted) {
      //check if we need to update
      const currItem = currState.submittedData.map[submissionTypeId][id];
      const newItem = currItem
        ? {
            ...currItem,
            ...item,
          }
        : item;
      copiedData.submittedData.map[submissionTypeId][newItem.id] = newItem;
      //grab index of id in arr
      const arr = copiedData.submittedData.arr[submissionTypeId];
      let idx = findById(arr, newItem.id);
      copiedData.submittedData.arr[submissionTypeId][idx] = newItem;
    }
    if (inOngoing) {
      //check if we need to update
      const currItem = currState.ongoingData[id];
      const newItem = currItem
        ? {
            ...currItem,
            ...item,
          }
        : item;
      copiedData.ongoingData[newItem.id] = newItem;
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
  items: (T & { id: string; questionId?: string; quizId?: string })[];
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
    if (inOngoing && id in currState.ongoingData)
      delete currState.ongoingData[id];
    if (inSubmitted && id in copiedData.submittedData.map[submissionTypeId]) {
      delete copiedData.submittedData.map[submissionTypeId][id];
      const arr = copiedData.submittedData.arr[submissionTypeId];
      let idx = findById(arr, id);
      //remove element
      arr.splice(idx, 1);
    }
  });
  setState(copiedData);
  return copiedData;
};
