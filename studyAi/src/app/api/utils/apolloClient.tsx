import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { createSchema } from "../graphql/graphql";
const env = process.env.NODE_ENV;
if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
const createServerGraphQLClient = async (url: string) =>
  new ApolloClient({
    link: new SchemaLink({ schema: await createSchema() }),
    cache: new InMemoryCache(),
  });

export default createServerGraphQLClient;
