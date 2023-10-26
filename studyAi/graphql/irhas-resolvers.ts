/*
Custom Resolvers Needed:
- Create Question Routes (Irha)
- Create User Info Routes (Irha)
*/
import { resolvers } from "../prisma/generated"

@Resolver()
export class GenerateAiQuestion {
  @Query(returns => Question, { nullable: true })
  async aiQuestion(@Ctx() { prisma }: Context): Promise<Question | null> {
    return await prisma.user.findUnique({
      where: { email: "bob@prisma.io" },
    });
  }
}