import {
  User,
  UserCredential,
  Question,
  QuestionLike,
  QuestionSubmission,
  QuizSubmission,
  Quiz,
  QuizLike,
} from "@prisma/client/edge";
export type PrismaTypeMap = {
  user: User;
  userCredential: UserCredential;
  question: Question;
  questionLike: QuestionLike;
  questionSubmission: QuestionSubmission;
  quizSubmission: QuizSubmission;
  quiz: Quiz;
  quizLike: QuizLike;
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
export function isUserCreds(obj: any): obj is UserCredential {
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
export function isQuestionLike(obj: any): obj is QuestionLike {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.userId === "string" &&
      typeof obj.questionId === "string"
  );
}
export function isQuestionSubmission(obj: any): obj is QuestionSubmission {
  return typeWrapper(
    () =>
      typeof obj.id === "string" &&
      typeof obj.score === "number" &&
      typeof obj.userId === "string" &&
      typeof obj.questionId === "string"
  );
}
export function isQuizSubmission(obj: any): obj is QuizSubmission {
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
export function isQuizLike(obj: any): obj is QuizLike {
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
    case "userCredential":
      return isUserCreds(doc) ? doc : null;
    case "question":
      return isQuestion(doc) ? doc : null;
    case "questionLike":
      return isQuestionLike(doc) ? doc : null;
    case "questionSubmission":
      return isQuestionSubmission(doc) ? doc : null;
    case "quizSubmission":
      return isQuizSubmission(doc) ? doc : null;
    case "quiz":
      return isQuiz(doc) ? doc : null;
    case "quizLike":
      return isQuizLike(doc) ? doc : null;
    default:
      return doc;
  }
};
