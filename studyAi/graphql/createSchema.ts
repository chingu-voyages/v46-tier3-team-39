// import { buildSchema } from "type-graphql";
// import { resolvers } from "../prisma/generated/type-graphql"; // Auto-generated resolvers
import typegraph from 'type-graphql'
import * as generatedFiles from "../prisma/generated/type-graphql"
const { buildSchema } = typegraph
const resolvers = generatedFiles.resolvers;
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
if (require.main === module) {
  createSchema();
  console.log("Running from the command line");
}
