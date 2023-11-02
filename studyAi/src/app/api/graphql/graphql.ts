import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { allResolvers } from "../../../../graphql/index"; // Custom resolvers
import { resolvers } from "../../../../prisma/generated/type-graphql"; // Auto-generated resolvers
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaDb } from "@/app/util/prisma/connection";
import { buildSchema } from "type-graphql";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";

export async function createSchema() {
  const schema = await buildSchema({
    resolvers: allResolvers, // Custom resolvers
    // resolvers, // Auto-generated resolvers
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
    let session: Session | null = null;
    try {
      session = await getServerSession(req, res, options);
    } catch (e) {
      session = null;
    }
    const contextData = {
      req,
      res,
      prisma: prismaDb,
      session
    };
    return contextData;
  },
});
export default main;
