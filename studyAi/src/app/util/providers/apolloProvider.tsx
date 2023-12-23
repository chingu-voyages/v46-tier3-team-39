"use client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  createGraphQLClient,
  generateURL,
} from "../../../gql/clients/apolloClientClient";
import { ApolloProvider } from "@apollo/client";
const env = process.env.NODE_ENV;
export const ClientSideApolloClient = createGraphQLClient(generateURL());
export const ApolloProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApolloProvider client={ClientSideApolloClient}>{children}</ApolloProvider>
  );
};
if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
export default ApolloProviderWrapper;
