
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaDb } from "@/app/util/prisma/connection";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { GraphQLError } from "graphql";
import { createSchema } from "../../../../graphql/createSchema";
import { NextApiResponse } from "next";
const server = new ApolloServer({
  schema: await createSchema(),
});
const canUserModify = (userId: string | undefined, creatorId: string) => {
  if (userId !== creatorId)
    throw new GraphQLError("User is not authorized/authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
};
const main = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => {
    let session: Session | null = null;
    const body = await req.graphQLbody
    try {
      res.getHeader = (name: string) => res.headers?.get(name);
      res.setHeader = (name: string, value: string) =>
        res.headers?.set(name, value);
      session = await getServerSession(req, res, options);
    } catch (e) {
      session = null;
    }
    // let actualId = req.body.variables.creatorId
    //   ? req.body.variables.creatorId
    //   : req.body.variables.userId
    //   ? req.body.variables.userId
    //   : req.body.variables.id;
    // let resolverRequested = req.body.query.split("{")[1].split("(")[0];
    // // Cases to consider: queries where user doesn't need to be logged in (getAll type), question and quiz contains creatorId`
    // // All mutations (add, update, delete) will have creatorId

    // console.log("-----------------------------------");
    // console.log(req.body);
    // console.log("-----------------------------------");

    // // Session may be null (eg. question library page)
    // // use the following function when you want to explicity check
    // // if a user has access. If the route doesnt require access, do
    // // not call this function
    // canUserModify(session?.user?.id, actualId);
    const contextData = {
      req,
      res: res as NextApiResponse,
      prisma: prismaDb,
      session,
    };

    return contextData;
  },
});

export default main;
