import { Question, QuizLike, QuizSubmission } from "@prisma/client";
import { prismaDb, allQuestions } from "./seedData";

async function main() {
  const deleteArrPromise = [
    prismaDb.question.deleteMany({}),
    prismaDb.questionLike.deleteMany({}),
    prismaDb.quiz.deleteMany({}),
    prismaDb.quizLike.deleteMany({}),
    prismaDb.questionSubmission.deleteMany({}),
    prismaDb.quizSubmission.deleteMany({}),
  ];
  await Promise.all(deleteArrPromise);
  // Question
  const allUserQuestions = await allQuestions();
  const questionPromise: Promise<Question>[] = [];
  for (let i = 0; i < allUserQuestions.length; i++) {
    questionPromise.push(
      prismaDb.question.create({ data: allUserQuestions[i] })
    );
  }
  const questionInfo = await Promise.all(questionPromise);
  // QuestionLikes, Quiz, and Question Submissions
  const questionSubmissionsData = questionInfo.map((question) => ({
    userId: question.creatorId,
    questionId: question.id,
    score: {
      maxScore: 1,
      actualScore: 1,
    },
    time: null,
  }));
  const questionLikesData = questionInfo.map((question) => ({
    userId: question.creatorId,
    questionId: question.id,
    dislike: false,
  }));
  //we do one by one since we need this data
  const quizItemsData = questionInfo.map((question) =>
    prismaDb.quiz.create({
      data: {
        name: "Chemistry Quiz",
        tags: question.tags,
        likeCounter: {
          likes: 1,
          dislikes: 0,
        },
        creatorId: question.creatorId,
        questionIds: [question.id],
      },
    })
  );
  const quizInfoPromise = Promise.all(quizItemsData);
  const [quizInfo, questionLikes, questionSubmissions] = await Promise.all([
    quizInfoPromise,
    prismaDb.questionLike.createMany({ data: questionLikesData }),
    prismaDb.questionSubmission.createMany({ data: questionSubmissionsData }),
  ]);
  // await Promise.all(questionLikePromise);
  // const quizInfo = await Promise.all(quizPromise);
  // QuizLikes and Submissions
  const quizLike: Omit<QuizLike, "id" | "dateCreated">[] = quizInfo.map(
    (quiz) => {
      const item = { userId: quiz.creatorId, quizId: quiz.id, dislike: false };
      return item;
    }
  );
  const submission: Omit<QuizSubmission, "id" | "dateCreated">[] = quizInfo.map(
    (quiz) => {
      const item = {
        userId: quiz.creatorId,
        quizId: quiz.id,
        score: {
          maxScore: 1,
          actualScore: 0,
        },
        time: null,
      };
      return item;
    }
  );
  const quizLikePromise = prismaDb.quizLike.createMany({ data: quizLike });
  const submissionPromise = prismaDb.quizSubmission.createMany({
    data: submission,
  });
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
