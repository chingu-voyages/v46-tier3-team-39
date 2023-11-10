import { User } from "@prisma/client";
export const QuestionTypes = [
  "Multiple Choice",
  "Checkbox",
  "Short Answer",
] as const;
export type UserInfo = User;
