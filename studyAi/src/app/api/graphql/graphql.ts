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

export async function createSchema() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: {
      path: "./graphql/schema.graphql",
    },
  });
  return schema;
}

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
    // const acessibleModels = {
    //   question: "question",
    //   quiz: "quiz"
    // }
    // const actualId = (req.body.variables.creatorId) ? req.body.variables.creatorId : (req.body.variables.userId) ? req.body.variables.userId : req.body.variables.id;
    // const resolverRequested = req.body.query.split('{')[1].split("(")[0];
    // let sessionNeeded = true;
    // for (const key of Object.keys(acessibleModels)) {
    //   if (resolverRequested.toLowerCase().include(acessibleModels[key])) {
    //     sessionNeeded = false;
    //     break;
    //   }
    // }

    // console.log(sessionNeeded)

    // if (sessionNeeded && !session || session.user.id !== actualId)
    //   throw new GraphQLError('User is not authorized/authenticated', {
    //     extensions: {
    //       code: 'UNAUTHENTICATED',
    //       http: { status: 401 },
    //     }
    // });

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
