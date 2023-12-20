import {
  Question,
  QuizLike,
  QuizSubmission,
  Subscriber,
  User,
} from "@prisma/client";
import { prismaDb, allQuestions } from "./seedData";
import { ObjectId } from "bson";

async function main() {
  const deleteArrPromise = [
    prismaDb.subscriber.deleteMany({}),
    prismaDb.question.deleteMany({}),
    prismaDb.questionLike.deleteMany({}),
    prismaDb.quiz.deleteMany({}),
    prismaDb.quizLike.deleteMany({}),
    prismaDb.questionSubmission.deleteMany({}),
    prismaDb.quizSubmission.deleteMany({}),
    prismaDb.quizSubmission.deleteMany({}),
  ];

  await Promise.all(deleteArrPromise);
  try {
    //update user default keys
    await prismaDb.user.updateMany({
      data: {
        tags: [],
        school: "",
        questionData: {
          generated: 0,
          answered: 0,
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  // Question
  const { subscribers, allUserQuestions, totalQuestions } =
    await allQuestions();
  const questionPromise: Promise<Question>[] = [];
  const subscriberPromise: Promise<Subscriber>[] = [];
  for (let i = 0; i < allUserQuestions.length; i++) {
    questionPromise.push(
      prismaDb.question.create({ data: allUserQuestions[i] })
    );
  }

  for (let i = 0; i < subscribers.length; i++) {
    subscriberPromise.push(
      prismaDb.subscriber.create({ data: subscribers[i] })
    );
  }

  await Promise.all(subscriberPromise);
  const questionInfo = await Promise.all(questionPromise);

  // QuestionLikes, Quiz, and Question Submissions
  const questionSubmissionsData = questionInfo.map((question) => ({
    userId: question.creatorId,
    questionId: question.id,
    score: {
      id: new ObjectId().toString(),
      maxScore: 1,
      actualScore: 1,
    },
    questionType: question.questionType,
    questionName: question.questionInfo.title,
    time: null,
    answerProvided: question.answer.correctAnswer,
  }));
  const questionLikesData = questionInfo.map((question) => ({
    userId: question.creatorId,
    questionId: question.id,
    dislike: false,
  }));
  const quizItemsData = questionInfo.map((question) =>
    prismaDb.quiz.create({
      data: {
        name: "Chemistry Quiz",
        tags: question.tags,
        creatorId: question.creatorId,
        questionIds: [question.id],
        likeCounter: {
          id: new ObjectId().toString(),
          likes: 1,
          dislikes: 0,
        },
        private: false,
      },
    })
  );
  const quizInfoPromise = Promise.all(quizItemsData);
  const [quizInfo, questionLikes, questionSubmissions] = await Promise.all([
    quizInfoPromise,
    prismaDb.questionLike.createMany({ data: questionLikesData }),
    prismaDb.questionSubmission.createMany({ data: questionSubmissionsData }),
  ]);

  // QuizLikes and Submissions
  const quizLike: Omit<QuizLike, "id" | "dateCreated">[] = quizInfo.map(
    (quiz) => {
      const item = { userId: quiz.creatorId, quizId: quiz.id, dislike: false };
      return item;
    }
  );
  const submission: Omit<QuizSubmission, "id" | "dateCreated" | "quizType">[] = quizInfo.map(
    (quiz) => {
      const item = {
        userId: quiz.creatorId,
        quizId: quiz.id,
        quizName: quiz.name,
        score: {
          id: new ObjectId().toString(),
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
  await prismaDb.user.updateMany({
    where: {
      email: {
        contains: "@",
      },
    },
    data: {
      questionData: {
        generated: totalQuestions,
        answered: totalQuestions,
      },
    },
  });
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
