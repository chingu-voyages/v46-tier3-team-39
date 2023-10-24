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

@Resolver(of => Question)
class CustomQuestionResolver {
  @Query(returns => Question, { nullable: true })
  async firstQuestion(@Ctx() { prisma }: Context): Promise<Question | null> {
    return await prisma.question.findFirst({
      where: { id: "653316b5f175c9c57765a500" },
    });
  }
}
