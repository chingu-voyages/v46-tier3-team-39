import { User } from "@prisma/client";
export const QuestionTypes = [
  "multipleChoice",
  "selectMultiple",
  "shortAnswer",
] as const;
export type UserInfo = User