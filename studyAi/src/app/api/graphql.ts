import { PageConfig } from "next";

export const config: PageConfig = {
  api : {
    bodyParser: false
  }
};

const apolloServer = new ApolloServer({
  context: createContext,
  typeDefs,
  resolver,
  introspection: true
});

const startServer = apolloServer.start();