import { PrismaClient, PrismaPromise, QuestionLikes, Quiz, QuizLikes, Submissions } from '@prisma/client'
import { allData } from './seedData'
const prismaDb = new PrismaClient()

async function main() {  
  await prismaDb.question.deleteMany({});
  await prismaDb.questionLikes.deleteMany({});
  await prismaDb.quiz.deleteMany({});
  await prismaDb.quizLikes.deleteMany({});
  await prismaDb.submissions.deleteMany({});

  // Question
  const questionPromise = allData.allQuestions.map(item => prismaDb.question.create({data: item}));
  const questionInfo = await prismaDb.$transaction(questionPromise);
  
  // QuestionLikes and Quiz
  const questionLikePromise: Promise<QuestionLikes>[] = [];
  // const quizPromise: Promise<Quiz>[] = [];
  for (const question of questionInfo) {
    const questionLikeItem = { userId: question.creatorId, questionId: question.id };
    questionLikePromise.push(prismaDb.questionLikes.create({ data: questionLikeItem }));
    
    // const quizItem = { name: "Chemistry Quiz", tags: question.tags, likes: 1, creatorId: question.creatorId, questionIds: [ question.id ] };
    // quizPromise.push(prismaDb.quiz.create({ data: quizItem }));
  }
  await prismaDb.$transaction(questionLikePromise);
  // const quizInfo = await prismaDb.$transaction(quizPromise);

  // QuizLikes and Submissions
//   const quizLikePromise: Promise<QuizLikes>[] = [];
//   const submissionPromise: Promise<Submissions>[] = [];
//   for (const quiz of quizInfo) {
//     const item = { userId: quiz.creatorId, quizId: quiz.id };
//     quizLikePromise.push(prismaDb.quizLikes.create({ data: item }));
//     submissionPromise.push(prismaDb.submissions.create({ data: item }));
//   }
//   await prismaDb.$transaction(quizLikePromise);
//   await prismaDb.$transaction(submissionPromise);
}

main()
  .then(async () => {
    await prismaDb.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaDb.$disconnect()
    process.exit(1)
  })