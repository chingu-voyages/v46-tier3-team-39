import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../../prisma/generated/type-graphql";
import { startServerAndCreateNextHandler } from "./lib/startServerAndCreateNextHandler";
import { prismaDb } from "@/app/util/prisma/connection";
import { buildSchema } from "type-graphql";
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

const getKey = (keyName: string, queryStr: string) => {
  //   const queryStr = 'query QueryQuestionSubmissions($id: String, $startDate: DateTimeISO, $endDate: DateTimeISO) {\n' +
  //   '  questionSubmissions(\n' +
  //   '    where: {userId: {equals: $id}, dateCreated: {gte: $startDate, lte: $endDate}}\n' +
  //   '    orderBy: {dateCreated: desc}\n' +
  //   '  ) {\n' +
  //   '    id\n' +
  //   '    __typename\n' +
  //   '  }\n' +
  //   '}';

  // `
//   query GetFullQuestion($id: String) {
//     question(where: { id: $id }) {
//       id
//       creatorId
//       questionType
//       tags
//       questionInfo {
//         title
//         description
//         options
//       }
//       likeCounter {
//         likes
//         dislikes
//       }
//     }
//   }
// `
  //   const regex = new RegExp(keyName + ': {equals: \\$(.*?)},', 's');
  const regex = new RegExp(keyName + ': {equals: \\$(.*?)},', 's');
  const regex2 = new RegExp(keyName + ': \\$(\\w+)', 's');
  const match = queryStr.match(regex) || queryStr.match(regex2);
  return match ? match[1] : null;
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
    const parsedQuery = getParsedQuery(body);
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
    // const body = await req.graphQLBody;
    // let parsedQuery;
    // (!body.query.includes("where")) ? canUserModify(null, null, true, "Improper Query") : null;
    // let session: Session | null = null;
    // try {
    //   parsedQuery = parse(body.query);
    // } catch (e) {
    //   canUserModify(null, null, true, "Improper Query");
    // }
    // try {
    //   res.getHeader = (name: string) => res.headers?.get(name);
    //   res.setHeader = (name: string, value: string) =>
    //   res.headers?.set(name, value);
    //   session = await getServerSession(req, res, options);
    // } catch (e) {
    //   session = null;
    // }
    // req = req as NextApiRequest;
    // res = res as NextApiResponse;
    // const acessibleModels = ["question", "quiz"];

    // const resolverRequested = parsedQuery.definitions[0].selectionSet.selections[0].name.value;
    // const variables = getAllVariables(parsedQuery, body, resolverRequested, acessibleModels);
    // const actualId = variables.creatorId || variables.userId;
    // const isQuery = parsedQuery.definitions[0].operation.toLowerCase() === "query";
    // const sessionNeeded = isSessionNeeded(isQuery, variables.public, resolverRequested, acessibleModels);
    // canUserModify(session, actualId, sessionNeeded, "User is not authorized/authenticated")

    // const contextData = {
    //   req,
    //   res,
    //   prisma: prismaDb,
    //   session,
    // };

    // return contextData;

    /**
     *  // Switch Statements
     // case IsQuery:
     if (isQuery) {
       switch (resolverRequested) {
         // case Questions: case Quizzes:
         case "questions": case "quizzes":
           // if not -> canUserModify(actualId)
           if (!variables.public) {
             canUserModify(session, variables.actualId, true, "User is not authorized/authenticated");
           }
           break;
         // default: Every other model
         default:
           canUserModify(session, variables.actualId, true, "User is not authorized/authenticated");
        }
     // default: isMutation
     } else {
       canUserModify(session, variables.actualId, true, "User is not authorized/authenticated");
     }
     */
