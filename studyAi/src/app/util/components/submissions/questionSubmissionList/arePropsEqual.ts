import { Question } from "@prisma/client";

export const arePropsEqual = (
  prevProps: { data: Partial<Question>[] },
  newProps: { data: Partial<Question>[] }
) => {
  const isDataEqual =
    prevProps.data.every((val, idx) => val.id === newProps.data[idx].id) &&
    prevProps.data.length === newProps.data.length;
  return isDataEqual;
};
