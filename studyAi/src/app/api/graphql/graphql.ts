import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../prisma/generated/type-graphql";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { buildSchema } from 'type-graphql';

const prisma = new PrismaClient();

export async function main () {
  await prisma.$connect();

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: true
  })
    
  const server = new ApolloServer({
    schema,
    context: () => ({ prisma })
  });

  return startServerAndCreateNextHandler(server);
};