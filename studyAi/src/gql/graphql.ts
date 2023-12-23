import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "./integrationLib/startServerAndCreateNextHandler";
import { prismaDb } from "@/app/util/prisma/connection";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { createSchema } from "@/gql/createSchema";
import validateAuthRequirementInQuery, {
  getSession,
} from "./validateAuthRequirementInQuery";
const server = new ApolloServer({
  schema: await createSchema(),
});

const main = startServerAndCreateNextHandler(server, {
  context: async (
    req: NextApiRequest & { graphQLBody: any },
    res: NextApiResponse
  ) => {
    const body = await req.graphQLBody;
    const session: Session | null = await getSession(req, res);
    // throw error if query requires authentication and user is not authenticated
    // or does not have the proper read/write access rights
    // validateAuthRequirementInQuery({ session, body });
    const contextData = {
      req,
      res,
      prisma: prismaDb,
      session,
    };
    return contextData;
  },
});

export default main;
