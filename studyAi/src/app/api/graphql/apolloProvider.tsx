"use client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useIsClient } from "./isClientProvider";
const env = process.env.NODE_ENV;
if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
export const createGraphQLClient = (url: string) =>
  new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
const GraphQLProvider = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient();
  if (!isClient) return children;
  if (typeof window === undefined) return children;
  const graphQLURLDomain = window.location.origin;
  const url = `${graphQLURLDomain}/api/graphql`;
  return (
    <ApolloProvider client={createGraphQLClient(url)}>
      {children}
    </ApolloProvider>
  );
};

export default GraphQLProvider;