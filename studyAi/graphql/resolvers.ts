import { Question, FindFirstQuestionOrThrowResolver } from "../prisma/generated/type-graphql";
import {
  Resolver,
  Query,
  buildSchema,
  FieldResolver,
  Ctx,
  Root,
} from "type-graphql";
import { PrismaClient } from "@prisma/client";

interface Context {
  prisma: PrismaClient;
}
/*
Custom Resolvers Needed:
- Generate a single question, with category and tag context
- Generate a single question, using another question as a template + category + tag context (use OpenAI API)
- Upload/create a question's data into db !
- Create a route that adds, deletes, and updates a set, or a single question to a quiz
- Update and delete question routes
- (GraphQL ? REST API) Create the Exam/Quizzes Routes
- Create Question Routes
- Create User Info Routes
*/

@Resolver(of => Question)
class CustomQuestionResolver {
  @Query(returns => Question, { nullable: true })
  async firstQuestion(@Ctx() { prisma }: Context): Promise<Question | null> {
    return await prisma.question.findFirst({
      where: { id: "653316b5f175c9c57765a500" },
    });
  }
}
