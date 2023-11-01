import {
  Question,
  QuestionLike,
  Quiz,
  QuizLike,
  Submission,
} from "@prisma/client";
import { prismaDb, allQuestions } from "./seedData";

async function main() {
  await prismaDb.question.deleteMany({});
  await prismaDb.questionLike.deleteMany({});
  await prismaDb.quiz.deleteMany({});
  await prismaDb.quizLike.deleteMany({});
  await prismaDb.submission.deleteMany({});

  // Question
  const allUserQuestions = await allQuestions();
  const questionPromise: Promise<Question>[] = [];
  for (let i = 0; i < allUserQuestions.length; i++) {
    questionPromise.push(
      prismaDb.question.create({ data: allUserQuestions[i] })
    );
  }
  const questionInfo = await Promise.all(questionPromise);

  // QuestionLikes and Quiz
  const questionLikePromise: Promise<QuestionLike>[] = [];
  const quizPromise: Promise<Quiz>[] = [];
  for (const question of questionInfo) {
    const questionLikeItem = {
      userId: question.creatorId,
      questionId: question.id,
      dislike: false,
    };
    const quizItem: Omit<Quiz, "id" | "dateCreated"> = {
      name: "Chemistry Quiz",
      tags: question.tags,
      likeCounter: {
        likes: 1,
        dislikes: 0,
      },
      creatorId: question.creatorId,
      questionIds: [question.id],
    };
    questionLikePromise.push(
      prismaDb.questionLike.create({ data: questionLikeItem })
    );
    quizPromise.push(prismaDb.quiz.create({ data: quizItem }));
  }
  await Promise.all(questionLikePromise);
  const quizInfo = await Promise.all(quizPromise);
  // QuizLikes and Submissions
  const quizLike: Omit<QuizLike, "id" | "dateCreated">[] = quizInfo.map(
    (quiz) => {
      const item = { userId: quiz.creatorId, quizId: quiz.id, dislike: false };
      return item;
    }
  );
  const submission: Omit<Submission, "id" | "dateCreated">[] = quizInfo.map(
    (quiz) => {
      const item = {
        userId: quiz.creatorId,
        quizId: quiz.id,
        score: 1,
        questionId: null,
        time: null,
      };
      return item;
    }
  );
  const quizLikePromise = prismaDb.quizLike.createMany({data: quizLike})
  const submissionPromise = prismaDb.submission.createMany({data: submission})
  await Promise.all([quizLikePromise, submissionPromise]);
}

main()
  .then(async () => {
    await prismaDb.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaDb.$disconnect();
    process.exit(1);
  });
