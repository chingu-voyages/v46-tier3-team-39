import { PrismaClient } from "@prisma/client";
import { Question } from "../../../../prisma/generated/type-graphql";
export const prismaDb = new PrismaClient();
const questions: Omit<Question, "id" | "creatorId" | "dateCreated">[] = [
  {
    questionType: "Short Answer",
    tags: ["Science", "Chemistry"],
    question: {
      title: "Molecular Compound",
      description: "What is the molecular compound of water?",
      options: [],
    },
    answer: {
      correctAnswer: ["H20"],
    },
    likeCounter: {
      likes: 1,
      dislikes: 0,
    },
  },
  {
    questionType: "Multiple Choice",
    tags: ['Maths', 'Technology'],
    question: {
      title: 'Recursion',
      description: 'When does recursion end?',
      options: ['When the loop ends.', 'When the loop starts.', 'At the second iteration.']
    },
    answer: {
      correctAnswer: ['When we reach base case.'],
    },
    likeCounter: {
      likes: 1,
      dislikes: 0
    }
  }
];

export const allQuestions = async () => {
  const allUserIds = await prismaDb.user.findMany();
  const usersQuestions = [];

  for (const user of allUserIds) {
    for (const question of questions) {
      const questionData = { creatorId: user.id, ...question };
      usersQuestions.push(questionData);
    }
  }

  return usersQuestions;
};
