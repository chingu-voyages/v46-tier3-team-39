import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../prisma/generated/type-graphql";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaDb } from "@/app/util/prisma/connection";
import { buildSchema } from "type-graphql";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
export async function createSchema() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
  });
  return schema;
}
const server = new ApolloServer({
  schema: await createSchema(),
});
const main = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    //for testing only, but when writing custom resolver, call the connect function
    prismaDb.$connect();
    const contextData = {
      req,
      res,
      prisma: prismaDb,
      session: await getServerSession(req, res, options),
    };
    return contextData;
  },
});
export default main;
