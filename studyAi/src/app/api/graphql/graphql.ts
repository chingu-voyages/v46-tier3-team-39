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
  context: async (req, res: any) => {
    let session: Session | null = null;
    try {
      res.getHeader = (name: string) => res.headers?.get(name);
      res.setHeader = (name: string, value: string) =>
      res.headers?.set(name, value);
      session = await getServerSession(req, res, options);
    } catch (e) {
        session = null;
    }
  
    let actualId = (req.body.variables.creatorId) ? req.body.variables.creatorId : (req.body.variables.userId) ? req.body.variables.userId : req.body.variables.id;
    let resolverRequested = req.body.query.split('{')[1].split("(")[0];
    // Cases to consider: queries where user doesn't need to be logged in (getAll type), question and quiz contains creatorId`
    // All mutations (add, update, delete) will have creatorId

    console.log('-----------------------------------')
    console.log(req.body)
    console.log('-----------------------------------')

    // Session may be null (eg. question library page)
    if (session.user.id !== actualId)
      throw new GraphQLError('User is not authorized/authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
    });
    
    const contextData = {
      req,
      res: res as NextApiResponse,
      prisma: prismaDb,
      session
    };

    return contextData;
  },
});
export default main;
