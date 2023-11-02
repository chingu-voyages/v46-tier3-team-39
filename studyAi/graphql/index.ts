import { resolvers } from "../prisma/generated/type-graphql";
import { Resolver, Arg, Args, Ctx, Query, Mutation, Info } from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueQuestionArgs } from "../prisma/generated/type-graphql/resolvers/crud/Question/args/FindUniqueQuestionArgs";
import { Question } from "../prisma/generated/type-graphql";
import { NonEmptyArray } from "type-graphql";

// Custom Resolvers : https://prisma.typegraphql.com/docs/advanced/custom-operations/
// How to test the resolvers: https://docs.google.com/presentation/d/16v_wdvdu2-88dA7O1jAxj_BqbT7SMPn6Ig_7VL81o64/edit#slide=id.p3
/* Custom Resolver Example
  @Resolver()
  export class CustomUserResolver {
    @Query(returns => User, { nullable: true })
    async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
      return await prisma.user.findUnique({
        where: { email: "bob@prisma.io" },
      });
    }
  }
*/
/*
Custom Resolvers Needed:
- Reads, Adds, deletes, and updates a question into db (Make sure for Read, Update and Delete the sessionId is of the user who owns this question)
- Reads, Adds, deletes, and updates a quiz (Make sure for Read, Update and Delete the sessionId is of the user who owns this quiz)
- Reads, Adds, deletes, and updates a user (Make sure for Read, Update and Delete the sessionId is of the user who owns this question)
*/

// Each resolver has 2 steps
// 1. Verify the user can edit the data (for verification. session userId = question/quiz/user userId)
// 2. Use the auto-generated resolver

@Resolver((_of) => Question)
export class FindUniqueQuestionResolver {
  // @Query(_returns => Question, {
  //   nullable: true
  // })
  // async question(@Ctx() ctx: any, @Info() info: GraphQLResolveInfo,
  // @Args() args: FindUniqueQuestionArgs): Promise<Question | null> {
  //   const { _count } = transformInfoIntoPrismaArgs(info);
  //   const question = getPrismaFromContext(ctx).question.findUnique({
  //     ...args,
  //     ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
  //   });
  //   if (!ctx.session || ctx.session.userId !== question.creatorId) {
  //     throw new Error("You are not authorized to perform this action");
  //   }
  //   return question;
  // }
  @Query((_returns) => Question, {
    nullable: true,
  })
  async readQuestion(
    @Arg("id") id: string,
    @Ctx() { req, res, prisma, session }: any
  ): Promise<Question | null> {
    console.log(" HEREEEEEEEEEEEEEEEEE ");
    // console.log(prisma);
    console.log("id: " + id);
    const questions = await prisma.question.findFirst({
      where: { creatorId: id },
    });
    console.log(questions);
    console.log(" question ");

    // questions.map((each) => each.id);

    // if (!session || session.userId !== question.creatorId) {
    //   console.log("session: " + session);
    //   console.log("session.userId: " + session.userId);
    //   console.log("question.creatorId: " + question.creatorId);
    //   throw new Error("You are not authorized to perform this action");
    // }
    // prisma.$disconnect();
    return questions;
  }

  // @Mutation(_returns => Question, {
  //   nullable: true
  // })
  // async addQuestion(@Arg('questionType') questionType: string,
  //   @Arg('tags') tags: string[], @Arg('questionTitle') questionTitle: string,
  //   @Arg('questionDesc') questionDesc: string,
  //   @Arg('correctAnswer') correctAnswer: string[],
  //   @Arg('incorrectAnswer') incorrectAnswer: string[],
  //   @Ctx() {req, res, prisma, session}: any)
  //   : Promise<Question | null> {
  //     const questionData = await prisma.questionData.create({
  //       data: {
  //         questionTitle: questionTitle,
  //         questionDesc: questionDesc,
  //       }
  //     })
  //     const answer = await prisma.answer.create({
  //       data: {
  //         correctAnswer: correctAnswer,
  //         incorrectAnswer: incorrectAnswer,
  //       }
  //     })
  //     const creator = await prisma.user.findUnique({
  //       where: { id: session.userId }
  //     })
  //     const likeCounter = await prisma.likeCounter.create({
  //       likes: 0,
  //       dislikes: 0
  //     })
  //     const question = await prisma.question.create({
  //       data: {
  //         creatorId: creator.id,
  //         questionType: questionType,
  //         tags: tags,
  //         question: questionData,
  //         answer: answer,
  //         likeCounter: likeCounter
  //       }
  //     });
  //     prisma.$disconnect();
  //     return question;
  //   }
}

export const allResolvers: NonEmptyArray<Function> = [
  FindUniqueQuestionResolver,
];
