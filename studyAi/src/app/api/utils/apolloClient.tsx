import {  headers } from "next/headers";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  ApolloClient,
  InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { SchemaLink } from '@apollo/client/link/schema';

const env = process.env.NODE_ENV;
if (env === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
const createClient = (url: string, ssrMode) =>
  new ApolloClient({
    ssrMode: !!ssrMode,
    uri: ssrMode ? url : undefined,
    link: ssrMode
        ? new SchemaLink({ schema })
        // createHttpLink({
        //   uri: url,
        //   credentials: "same-origin",
        //   headers: ssrMode.cookie
        //     ? {
        //         cookie: ssrMode.cookie,
        //       }
        //     : undefined,
        // })
      : undefined,
    cache: new InMemoryCache(),
  });

const GraphQLProvider = ({ children }: { children: React.ReactNode }) => {
  const headersList = headers();
  const graphQLURLDomain = headersList.get("host");
  const url = `${
    env === "development" ? "http" : "https"
  }://${graphQLURLDomain}/api/graphql`;
  return (
    <ApolloProvider
      client={createClient(url, {
        cookie: headersList.get("cookie"),
      })}
    >
      {children}
    </ApolloProvider>
  );
};

export default GraphQLProvider;
