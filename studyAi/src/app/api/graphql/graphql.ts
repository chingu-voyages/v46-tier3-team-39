import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prismaDb } from "@/app/util/prisma/connection";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { GraphQLError } from "graphql";
import { createSchema } from "../../../../graphql/createSchema";
import { NextApiResponse } from "next";
const server = new ApolloServer({
  schema: await createSchema(),
});
const main = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => {
    let session: Session | null = null;
    try {
      res.getHeader = (name: string) => res.headers?.get(name);
      res.setHeader = (name: string, value: string) =>
        res.headers?.set(name, value);
      session = await getServerSession(req, res, options);
    } catch (e) {
      session = null;
    }
    try {
    } catch (err) {
      console.log(err, "error");
      throw new GraphQLError("Please provide a prop gql request in the body", {
        extensions: {
          code: "BAD_REQUEST",
          http: { status: 400 },
        },
      });
    }
    const contextData = {
      req,
      res: res as NextApiResponse,
      prisma: prismaDb,
      session,
    };
    return contextData;
  },
});

export default main;
