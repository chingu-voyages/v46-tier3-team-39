import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "./lib/startServerAndCreateNextHandler";
import { prismaDb } from "@/app/util/prisma/connection";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLError, parse } from "graphql";
import { createSchema } from "../../../../graphql/createSchema";

const server = new ApolloServer({
  schema: await createSchema(),
});

const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.getHeader = (name: string) => res.headers?.get(name);
    res.setHeader = (name: string, value: string) =>
    res.headers?.set(name, value);
    return await getServerSession(req, res, options);
  } catch (e) {
     return null;
  }
}

const getParsedQuery = (queryString: string) => {
  (!queryString.includes("where")) ? canUserModify(null, null, "Improper Query") : null;
  try {
    return parse(queryString);
  } catch (e) {
    canUserModify(null, null, "Improper Query");
  }
}

 const canUserModify = (session: Session | null, actualId: string | null, message: string) => {
  if (!session || session?.user?.id !== actualId)
    throw new GraphQLError(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
};

const validateVariables = (resolverRequested : string, variables: { public: boolean | null, actualId: string | null, take: number | null}, accessibleModels: string[]) => {
  if ((accessibleModels.includes(resolverRequested) && variables.public === null) || !variables.actualId || !variables.take) {
    canUserModify(null, null, "Improper Query");
  }
}

const main = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => {
    const body = await req.graphQLBody;
    // Get all variables (actualId, take, public (only for quiz and question))
    const variables: { actualId: string | null, public: boolean | null, take: number | null} = {
      actualId: body.variables.id || null,
      public: !body.variables.private || null,
      take: body.variables.take || null
    };
    const parsedQuery = getParsedQuery(body.query);
    const resolverRequested = parsedQuery?.definitions[0].selectionSet.selections[0].name.value;
    const accessibleModels = ["question", "quiz"];
    const isQuery = parsedQuery?.definitions[0].operation.toLowerCase() === "query";

    const session: Session | null = await getSession(req, res);
    req = req as NextApiRequest;
    res = res as NextApiResponse;


    // Validate if there is an id, take and [public (only for quiz and question)]
    validateVariables(resolverRequested, variables, accessibleModels);

    if (isQuery) {
      switch (resolverRequested) {
        case "questions": case "quizzes":
          if (!variables.public) {
            canUserModify(session, body.variables.actualId, "User is not authorized/authenticated");
          }
          break;
        default:
          canUserModify(session, variables.actualId, "User is not authorized/authenticated");
      }
    } else {
      canUserModify(session, variables.actualId, "User is not authorized/authenticated");
    }

    const contextData = {
      req,
      res,
      prisma: prismaDb,
      session
    };

    return contextData;
  }
});

export default main;
