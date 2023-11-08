import { User } from "@prisma/client";
export const QuestionTypes = [
  "multipleChoice",
  "Checkbox",
  "Short Answer",
] as const;
export type UserInfo = User