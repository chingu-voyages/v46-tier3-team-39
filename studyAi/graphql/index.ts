import { FindUniqueQuestionArgs } from "../prisma/generated/type-graphql";
import { Resolver, Arg, Args, Ctx, Query, Mutation, Info } from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Question } from "../prisma/generated/type-graphql";
import { NonEmptyArray } from "type-graphql";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../prisma/generated/type-graphql/helpers";

@Resolver((_of) => Question)
export class FindUniqueQuestionResolver {

  // Returns array of question by creatorId or user information by userId
  @Query((_returns) => [Question], {
    nullable: true,
  })
  async readQuestion(
    @Arg("id") id: string,
    @Ctx() { req, res, prisma, session }: any
  ): Promise<[Question] | null> {
    prisma.$connect();
    const question = await prisma.question.findMany({
      where: { creatorId: id },
    });

    // if (!session || session.userId !== question.creatorId) {
    //   throw new Error("You are not authorized to perform this action");
    // }
    prisma.$disconnect();
    return question;
  }
  async readUser(
    @Arg("id") id: string,
    @Ctx() { req, res, prisma, session }: any
  ): Promise<Question | null> {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    // if (!session || session.userId !== question.creatorId) {
    //   throw new Error("You are not authorized to perform this action");
    // }
    prisma.$disconnect();
    return user;
  }

  // Add, Update, Delete a question
  @Mutation((_returns) => Question, {
    nullable: true,
  })
  async addQuestion(
    @Arg("creatorId") creatorId: string,
    @Arg("questionType") questionType: string,
    @Arg("tags") tags: string[],
    @Arg("questionTitle") questionTitle: string,
    @Arg("questionDesc") questionDesc: string,
    @Arg("correctAnswer") correctAnswer: string[],
    @Arg("incorrectAnswer") incorrectAnswer: string[],
    @Ctx() { req, res, prisma, session }: any
  ): Promise<Question | null> {
    prisma.$connect();
    
    const questionData = await prisma.question.create({
      data: {
       creatorId,
       questionType,
       tags,
       question: {
        title: questionTitle,
        description: questionDesc,
        options: incorrectAnswer
       },
       answer: {
        correctAnswer
       },
       likeCounter: {
        likes: 0,
        dislikes: 0
       }
      },
    });

    prisma.$disconnect();
    return questionData;
  }
  async updateQuestion(
    @Arg("id") id: string,
    @Arg("questionType") questionType: string,
    @Arg("tags") tags: string[],
    @Arg("questionTitle") questionTitle: string,
    @Arg("questionDesc") questionDesc: string,
    @Arg("correctAnswer") correctAnswer: string[],
    @Arg("incorrectAnswer") incorrectAnswer: string[],
    @Ctx() { req, res, prisma, session }: any
  ): Promise<Question | null> {
    prisma.$connect();
    
    const questionData = await prisma.question.update({
      where: { id },
      data: {
       questionType,
       tags,
       question: {
        title: questionTitle,
        description: questionDesc,
        options: incorrectAnswer
       },
       answer: {
        correctAnswer
       },
       likeCounter: {
        likes: 0,
        dislikes: 0
       }
      }
    });

    prisma.$disconnect();
    return questionData;
  }
  async deleteQuestion(
    @Arg("id") id: string,
    @Ctx() { req, res, prisma, session }: any
  ): Promise<Question | null> {
    prisma.$connect();
    
    const questionData = await prisma.question.delete({
      where: { id },
    });

    prisma.$disconnect();
    return questionData;
  }
}

// async function addQuestion(parent, args, context, info) {
//   context.prisma.$connect();

//   console.log('---------------------------------------------')
//   console.log(args)
//   console.log('---------------------------------------------')
  
//   const questionData = await context.prisma.question.create({
//     data: {
//       creatorId: args.creatorId,
//       questionType: args.questionType,
//       tags: args.tags,
//       question: {
//         title: args.questionTitle,
//         description: args.questionDesc,
//         options: args.incorrectAnswer
//       },
//       answer: {
//         correctAnswer: args.correctAnswer
//       },
//       likeCounter: {
//         likes: 0,
//         dislikes: 0
//       }
//     }
//   });
  
//   context.prisma.$disconnect();
//   return questionData;
// }

export const allResolvers: NonEmptyArray<Function> = [
  FindUniqueQuestionResolver
];
