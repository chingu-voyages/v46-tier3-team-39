import { resolvers } from "../prisma/generated/type-graphql";
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

export const allResolvers = {

}