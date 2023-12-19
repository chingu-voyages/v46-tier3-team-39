import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { IncomingHttpHeaders } from "http";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import {
  generateURL
} from "./apolloClientClient";
const cache = new InMemoryCache();
const serverLink = (url: string, cookie?: string) =>
  createHttpLink({
    uri: url,
    credentials: "same-origin",
    headers: cookie
      ? {
          cookie: cookie,
        }
      : undefined,
  });
const createServerGraphQLClient = ({
  cookie,
  url,
}: {
  cookie?: IncomingHttpHeaders["cookie"];
  url: string;
}) => {
  return new ApolloClient({
    ssrMode: true,
    link: serverLink(url, cookie),
    cache: cache,
  });
};

class ServerGraphQLClientClass {
  client: ApolloClient<NormalizedCacheObject> | null;
  hasCookieSet?: IncomingHttpHeaders["cookie"];
  constructor(cookie?: IncomingHttpHeaders["cookie"]) {
    this.client = cookie
      ? createServerGraphQLClient({ cookie, url: generateURL() })
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
      //set new link with cookie
      if (this.client) this.client.setLink(serverLink(generateURL(), cookie));
      else {
        this.client = createServerGraphQLClient({ cookie, url: generateURL() });
      }
      this.hasCookieSet = cookie;
    }
    //this is a public client, since we are not authenticated, so no session
    else {
      if (this.client) this.client.setLink(serverLink(generateURL()));
      else {
        this.client = createServerGraphQLClient({ url: generateURL() });
      }
      this.hasCookieSet = undefined;
    }
    return this.client;
  }
}
const ServerGraphQLClientInstance = new ServerGraphQLClientClass();
const ServerGraphQLClient = (session: Session | null) => {
  const allCookies = cookies();
  const mergedCookieArr = allCookies
    .getAll()
    .map((cookie) => cookie.name + "=" + cookie.value);
  let mergedCookie = "";
  if (mergedCookieArr.length > 1)
    mergedCookie = mergedCookieArr.reduce((a, b) => `${a}; ${b}`);
  const client = ServerGraphQLClientInstance.setClient(session, mergedCookie);
  return client;
};
export default ServerGraphQLClient;
