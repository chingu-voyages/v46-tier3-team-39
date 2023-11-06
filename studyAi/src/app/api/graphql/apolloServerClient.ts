import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { IncomingHttpHeaders } from "http";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import { createGraphQLClient, generateURL } from "./apolloClientClient";
const createServerGraphQLClient = (
  cookie: IncomingHttpHeaders["cookie"],
  url: string
) => {
  if (!cookie) return createGraphQLClient(generateURL());
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: url,
      credentials: "same-origin",
      headers: {
        cookie: cookie,
      },
    }),
    cache: new InMemoryCache(),
  });
};

class ServerGraphQLClientClass {
  client: ApolloClient<NormalizedCacheObject> | null;
  hasCookieSet?: boolean;
  constructor(cookie?: IncomingHttpHeaders["cookie"]) {
    this.client = cookie
      ? createServerGraphQLClient(cookie, generateURL())
      : null;
    this.hasCookieSet = !!cookie;
  }
  //determines if the cookie has been set.
  //If it has, no new client.
  //if it hasnt we will need
  setClient(session: Session | null, cookie: IncomingHttpHeaders["cookie"]) {
    if (this.client && this.hasCookieSet) return this.client;
    //get cookie
    if ((this.hasCookieSet = !!cookie && !!session))
      this.client = createServerGraphQLClient(cookie, generateURL());
    else this.client = createGraphQLClient(generateURL());
    //ensure session is valid if not, we need a new client
    return this.client;
  }
}
const ServerGraphQLClientInstance = new ServerGraphQLClientClass();
const ServerGraphQLClient = (session: Session | null) => {
  const allCookies = cookies();
  const mergedCookie = allCookies
    .getAll()
    .map((cookie) => cookie.name + "=" + cookie.value)
    .reduce((a, b) => `${a}; ${b}`);
  const client = ServerGraphQLClientInstance.setClient(session, mergedCookie);
  return client;
};
export default ServerGraphQLClient;
