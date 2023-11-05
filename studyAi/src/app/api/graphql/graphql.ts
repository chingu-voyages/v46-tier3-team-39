import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../prisma/generated/type-graphql";
import { startServerAndCreateNextHandler } from "./lib/startServerAndCreateNextHandler";
import { prismaDb } from "@/app/util/prisma/connection";
import { buildSchema } from "type-graphql";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLError, parse } from "graphql";
import { createSchema } from "../../../../graphql/createSchema";

const server = new ApolloServer({
  schema: await createSchema(),
});

const main = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => {
    const body = await req.graphQLBody;
    let session: Session | null = null;
    try {
      res.getHeader = (name: string) => res.headers?.get(name);
      res.setHeader = (name: string, value: string) =>
        res.headers?.set(name, value);
      session = await getServerSession(req, res, options);
    } catch (e) {
      session = null;
    }
    req = req as NextApiRequest;
    res = res as NextApiResponse;
    console.log(body);
    const acessibleModels = ["question", "quiz"];

    // Parse the incoming GraphQL query
    const actualId = "";
    const resolverRequested = "";
    let sessionNeeded = true;
    if (acessibleModels.includes(resolverRequested)) {
      sessionNeeded = false;
    }

    if (sessionNeeded && (!session || session?.user?.id !== actualId))
      throw new GraphQLError('User is not authorized/authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
    });

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
