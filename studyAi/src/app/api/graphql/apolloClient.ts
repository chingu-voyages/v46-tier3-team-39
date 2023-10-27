import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const env = process.env.NODE_ENV;
export const createGraphQLClient = (url: string) =>
  new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
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
const ServerGraphQLClient = createGraphQLClient(generateURL());
export default ServerGraphQLClient;
