import { PrismaClient } from '@prisma/client'
export const prismaDb = new PrismaClient();
const questions = [
  {
    questionType: "Short Answer",
    tags: ['Science', 'Chemistry'],
    question: {
      title: 'Molecular Compound', 
      description: 'What is the molecular compound of water?' 
    },
    answer: {
      correctAnswer: ['H20'],
      incorrectAnswer: []
    },
    likeCounter: {
      likes: 1,
      dislikes: 0
    }
  },
  // {
  //   questionType: "Multiple Choice",
  //   tags: ['Maths', 'Technology'],
  //   question: {
  //     title: 'Recursion', 
  //     description: 'When does recursion end?' 
  //   },
  //   answer: {
  //     correctAnswer: ['When we reach base case.'],
  //     incorrectAnswer: ['When the loop ends.', 'When the loop starts.', 'At the second iteration.']
  //   },
  //   likeCounter: {
  //     likes: 1,
  //     dislikes: 0
  //   }
  // }
]

export const allQuestions = async () => {
  // const allUserIds = await Promise.all([prismaDb.user.find({})]);
  const allUserIds = [
    "6532640d3000a88180ba69e9",
    "6533f4c7489ef223ffc31a99",
    "6533fefdb0483e3cee168435",
    "653532658deb5932bf3eb265",
    "6536ddb235c3ce77ca8109ad",
    "6539e386324be6d36af691a1",
    "653ab29c526ebc279b3a514f",
    "653ab35b526ebc279b3a5165",
    "653aca8ca464dd2562f8088d",
    "653acadfa464dd2562f8088f"]
  const usersQuestions = [];

  for (const id of allUserIds) {
    for (const question of questions) {
      usersQuestions.push({creatorId: id, ...question});
    }
  }

  return usersQuestions;
}