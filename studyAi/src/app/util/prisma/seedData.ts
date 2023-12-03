import { PrismaClient } from "@prisma/client";
import { Question } from "../../../../prisma/generated/type-graphql";
import { ObjectId } from "bson";
export const prismaDb = new PrismaClient();

const createOptions = <T>(e: T[]) => {
  return e.map((val) => ({
    id: new ObjectId().toString(),
    value: val,
  }));
};

const questions: Omit<Question, "id" | "creatorId" | "dateCreated">[] = [
  {
    questionType: "Short Answer",
    tags: ["Science", "Chemistry"],
    questionInfo: {
      id: new ObjectId().toString(),
      title: "Nomenclature",
      description: "What is the molecular name of water?",
      options: [],
    },
    answer: {
      id: new ObjectId().toString(),
      correctAnswer: createOptions(["H20"]),
    },
    likeCounter: {
      id: new ObjectId().toString(),
      likes: 1,
      dislikes: 0,
    },
    private: false,
  },
  {
    questionType: "Multiple Choice",
    tags: ["Maths", "Technology"],
    questionInfo: {
      id: new ObjectId().toString(),
      title: "Recursion",
      description: "When does recursion end?",
      options: createOptions([
        "When the loop ends.",
        "When the loop starts.",
        "At the second iteration.",
        "When we reach base case."
      ]),
    },
    answer: {
      id: new ObjectId().toString(),
      correctAnswer: createOptions(["When we reach base case."]),
    },
    likeCounter: {
      id: new ObjectId().toString(),
      likes: 1,
      dislikes: 0,
    },
    private: false,
  },
  {
    questionType: "Select Multiple",
    tags: ["Science", "Chemistry"],
    questionInfo: {
      id: new ObjectId().toString(),
      title: "Molecular Compound",
      description:
        "Which of the following elements are found in the molecular formula H2O (water)?",
      options: createOptions(["Carbon", "Nitrogen", "Hydrogen", "Oxygen"]),
    },
    answer: {
      id: new ObjectId().toString(),
      correctAnswer: createOptions(["Hydrogen", "Oxygen"]),
    },
    likeCounter: {
      id: new ObjectId().toString(),
      likes: 1,
      dislikes: 0,
    },
    private: true,
  },
];

export const allQuestions = async () => {
  const allUserIds = await prismaDb.user.findMany();
  const allUserQuestions = [];
  const subscribers = [];

  for (const user of allUserIds) {
    subscribers.push({ email: user.email });
    for (const question of questions) {
      const questionData = { creatorId: user.id, ...question };
      allUserQuestions.push(questionData);
    }
  }

  return { allUserQuestions, subscribers, totalQuestions: questions.length };
};
