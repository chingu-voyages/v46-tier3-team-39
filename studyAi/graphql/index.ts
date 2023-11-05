import { FindUniqueQuestionArgs, User } from "../prisma/generated/type-graphql";
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

    console.log(question)

    // if (!session || session.userId !== question.creatorId) {
    //   throw new Error("You are not authorized to perform this action");
    // }
    prisma.$disconnect();
    return question;
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

@Resolver((_of) => User)
export class FindUniqueUserResolver {

  @Query((_returns) => [Question], {
    nullable: true,
  })
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
}

export const allResolvers: NonEmptyArray<Function> = [
  FindUniqueQuestionResolver,
  FindUniqueUserResolver
];
