import { User } from "@prisma/client";
export const QuestionTypes = [
  "multipleChoice",
  "selectMultiple",
  "Short Answer",
] as const;
export type UserInfo = User