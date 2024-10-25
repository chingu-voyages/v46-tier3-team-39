import { User } from "@prisma/client";
export const QuestionTypes = [
  "Multiple Choice",
  "Select Multiple",
  "Short Answer",
] as const;
export type UserInfo = User;
