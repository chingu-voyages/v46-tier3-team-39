import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
const env = process.env.NODE_ENV;
const cache = new InMemoryCache();
export const createGraphQLClient = (url: string) =>
  new ApolloClient({
    uri: url,
    cache: cache,
    credentials: "same-origin",
  });
export const generateURL = () => {
  const graphqlDomainProd = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN_PROD;
  const graphqlDomainDev = process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN_DEV;
  const url =
    (env === "development" ? graphqlDomainDev : graphqlDomainProd) +
    "/api/graphql";
  return url;
};

if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
