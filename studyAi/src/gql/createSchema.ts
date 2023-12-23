import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "../../prisma/generated/type-graphql";
export async function createSchema() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: {
      path: "./src/gql/schema.graphql",
    },
  });
  return schema;
}
if (require.main === module) {
  createSchema();
}

