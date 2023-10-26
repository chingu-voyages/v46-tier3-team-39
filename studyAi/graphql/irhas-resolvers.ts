/*
Custom Resolvers Needed:
- Reads, Adds, deletes, and updates a user (Irha)
*/
import { resolvers } from "../prisma/generated"

@Resolver()
export class CustomUserResolver {
  @Query(returns => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email: "bob@prisma.io" },
    });
  }
}