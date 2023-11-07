import { PrismaClient } from "@prisma/client";
import { Question } from "../../../../prisma/generated/type-graphql";
export const prismaDb = new PrismaClient();
const questions: Omit<Question, "id" | "creatorId" | "dateCreated">[] = [
  {
    questionType: "Short Answer",
    tags: ["Science", "Chemistry"],
    questionInfo: {
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
    private: false
  },
  {
    questionType: "Multiple Choice",
    tags: ['Maths', 'Technology'],
    questionInfo: {
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
    },
    private: false
  },
  {
    questionType: "Checkbox",
    tags: ['Science', 'Chemistry'],
    questionInfo: {
      title: 'Molecular Compound',
      description: 'Which of the following elements are found in the molecular formula H2O (water)?',
      options: ['Carbon', 'Nitrogen']
    },
    answer: {
      correctAnswer: ['Hydrogen', 'Oxygen'],
    },
    likeCounter: {
      likes: 1,
      dislikes: 0
    },
    private: true
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
