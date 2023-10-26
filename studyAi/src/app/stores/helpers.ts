import { GetState, SetState } from "react-sweet-state";
import { cloneDeep } from "lodash";

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
    ...Object.assign({}, Object.fromEntries({ ...arr })),
  };
  setState({
    data,
  });
  return data;
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
