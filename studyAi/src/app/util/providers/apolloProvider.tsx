"use client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import ServerGraphQLClient from "../../api/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
const env = process.env.NODE_ENV;
export const ApolloProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApolloProvider client={ServerGraphQLClient}>{children}</ApolloProvider>
  );
};
if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
export default ApolloProviderWrapper;
