import {
  Question,
  QuestionLikes,
  Quiz,
  QuizLikes,
  Submissions,
} from "@prisma/client";
import { prismaDb, allQuestions } from "./seedData";

async function main() {
  await prismaDb.question.deleteMany({});
  await prismaDb.questionLikes.deleteMany({});
  await prismaDb.quiz.deleteMany({});
  await prismaDb.quizLikes.deleteMany({});
  await prismaDb.submissions.deleteMany({});

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
  const questionLikePromise: Promise<QuestionLikes>[] = [];
  const quizPromise: Promise<Quiz>[] = [];
  for (const question of questionInfo) {
    const questionLikeItem = {
      userId: question.creatorId,
      questionId: question.id,
    };
    const quizItem: Omit<Quiz, 'id'|'dateCreated'> = {
      name: "Chemistry Quiz",
      tags: question.tags,
      likeCounter: {
        likes: 1,
        dislikes:0,
      },
      creatorId: question.creatorId,
      questionIds: [question.id],
    };
    questionLikePromise.push(
      prismaDb.questionLikes.create({ data: questionLikeItem })
    );
    quizPromise.push(prismaDb.quiz.create({ data: quizItem }));
  }
  await Promise.all(questionLikePromise);
  const quizInfo = await Promise.all(quizPromise);

  // QuizLikes and Submissions
  const quizLikePromise: Promise<QuizLikes>[] = [];
  const submissionPromise: Promise<Submissions>[] = [];
  for (const quiz of quizInfo) {
    const item = { userId: quiz.creatorId, quizId: quiz.id };
    quizLikePromise.push(prismaDb.quizLikes.create({ data: item }));
    submissionPromise.push(
      prismaDb.submissions.create({ data: { ...item, score: 1 } })
    );
  }
  // await Promise.all(quizLikePromise);
  await Promise.all(submissionPromise);
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
