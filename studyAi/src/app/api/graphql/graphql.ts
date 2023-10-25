import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../prisma/generated/type-graphql";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
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
export async function main() {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
  });
  return startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({
      req,
      res,
      session: await getServerSession(req, res, options),
    }),
  });
}
