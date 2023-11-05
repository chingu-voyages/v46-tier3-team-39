import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
// import { allResolvers } from "../../../../graphql/index"; // Custom resolvers
import { resolvers } from "../../../../prisma/generated/type-graphql"; // Auto-generated resolvers
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaDb } from "@/app/util/prisma/connection";
import { buildSchema } from "type-graphql";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import { NextApiResponse } from "next";

export async function createSchema() {
  const schema = await buildSchema({
    // resolvers: allResolvers, // Custom resolvers
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
      console.log("------------------------------------------------");
      console.log("e: " + e);
      console.log("------------------------------------------------");
      // session = null;
    }
    // contextData = {
    //   req,
    //   res,
    //   prisma: prismaDb,
    //   session: session,
    // };
    // console.log("contextData: " + contextData);
    contextData = {
      req,
      res: res as NextApiResponse,
      prisma: prismaDb,
      session,
    };
    return contextData;
  },
});
export default main;
