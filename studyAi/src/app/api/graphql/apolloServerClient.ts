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
  hasCookieSet?: IncomingHttpHeaders["cookie"];
  constructor(cookie?: IncomingHttpHeaders["cookie"]) {
    this.client = cookie
      ? createServerGraphQLClient(cookie, generateURL())
      : null;
    this.hasCookieSet = cookie;
  }
  //determines if the cookie has been set, and determines if a new
  //client is needed or not.
  setClient(session: Session | null, cookie: IncomingHttpHeaders["cookie"]) {
    //return if cookie is the same
    if (this.client && this.hasCookieSet && this.hasCookieSet === cookie)
      return this.client;
    //create new apollo client with new cookie
    if (!!cookie && !!session) {
      this.client = createServerGraphQLClient(cookie, generateURL());
      this.hasCookieSet = cookie;
    }
    //this is a public client, since we are not authenticated, so no session
    else {
      this.client = createGraphQLClient(generateURL());
      this.hasCookieSet = undefined;
    }
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
