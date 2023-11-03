import {
  User,
  UserCredentials,
  Question,
  QuestionLikes,
  Submissions,
  Quiz,
  QuizLikes,
} from "@prisma/client/edge";
export type PrismaTypeMap = {
  user: User;
  userCredentials: UserCredentials;
  question: Question;
  questionLikes: QuestionLikes;
  submissions: Submissions;
  quiz: Quiz;
  quizLikes: QuizLikes;
};
export type PrismaTypeMapAsGeneric<
  K extends keyof PrismaTypeMap = keyof PrismaTypeMap
> = {
  [P in K]: PrismaTypeMap[P];
}[K];
function typeWrapper(func: () => boolean) {
  try {
    return func();
  } catch (e) {
    return false;
  }
}
export function isUser(obj: any): obj is User {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      typeof obj.email === "string" &&
      typeof obj.usersReached === "number"
  );
}
export function isUserCreds(obj: any): obj is UserCredentials {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.userId === "string" &&
      typeof obj.email === "string" &&
      typeof obj.provider === "string"
  );
}
export function isQuestion(obj: any): obj is Question {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.creatorId === "string" &&
      typeof obj.type === "string" &&
      typeof obj.question === "object" &&
      typeof obj.question.title === "string" &&
      typeof obj.question.description === "string" &&
      typeof obj.answer === "object" &&
      typeof obj.answer.answer === "string" &&
      typeof obj.likeCounter === "object" &&
      typeof obj.likeCounter.likes === "number" &&
      typeof obj.likeCounter.dislikes === "number"
  );
}
export function isQuestionLikes(obj: any): obj is QuestionLikes {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.userId === "string" &&
      typeof obj.questionId === "string"
  );
}
export function isSubmissions(obj: any): obj is Submissions {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.score === "number" &&
      typeof obj.userId === "string" &&
      typeof obj.quizId === "string"
  );
}
export function isQuiz(obj: any): obj is Quiz {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      typeof obj.tags === "string" &&
      typeof obj.likes === "number" &&
      typeof obj.creatorId === "string"
  );
}
export function isQuizLikes(obj: any): obj is QuizLikes {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.userId === "string" &&
      typeof obj.questionId === "string"
  );
}
export const assertPrismaModel = <K extends keyof PrismaTypeMap>(
  collection: K,
  doc: PrismaTypeMapAsGeneric<K>
): PrismaTypeMapAsGeneric<K> | null => {
  // return doc;
  switch (collection) {
    case "user":
      return isUser(doc) ? doc : null;
    case "userCredentials":
      return isUserCreds(doc) ? doc : null;
    case "question":
      return isQuestion(doc) ? doc : null;
    case "questionLikes":
      return isQuestionLikes(doc) ? doc : null;
    case "submissions":
      return isSubmissions(doc) ? doc : null;
    case "quiz":
      return isQuiz(doc) ? doc : null;
    case "quizLikes":
      return isQuizLikes(doc) ? doc : null;
    default:
      return doc;
  }
};
