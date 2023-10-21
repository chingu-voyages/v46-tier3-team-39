import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import { redirect } from "next/navigation";

// Use it in server contexts
export function getSessionData(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, options);
}
export const protectRouteSSR = async (
  url: string,
  ...context:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  const session = await getSessionData(...context);
  if (!session) return redirect(url);
  return {
    props: {
      session,
    },
  };
};
export const redirectIfLoggedIn = async (
  url: string,
  ...context:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  const session = await getSessionData(...context);
  if (session) return redirect(url);
  return {
    props: {
      session,
    },
  };
};
