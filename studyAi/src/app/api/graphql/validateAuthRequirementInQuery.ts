import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { GraphQLError, parse } from "graphql";

const getParsedQuery = (queryString: string) => {
  (queryString.includes("query") && !queryString.includes("where"))
    ? canUserModify(null, null, "Improper Query")
    : null;
  try {
    return parse(queryString);
  } catch (e) {
    canUserModify(null, null, "Improper Query");
  }
};

const validateVariables = (
  resolverRequested: string,
  variables: {
    public: boolean | null;
    actualId: string | null;
    take: number | null;
  },
  accessibleModels: string[],
  isQuery: boolean
) => {
  if (
    (accessibleModels.includes(resolverRequested) &&
      variables.public === null) ||
    (isQuery && variables.take == null) ||
    !variables.actualId
  ) {
    canUserModify(null, null, "Improper Query");
  }
};

const canUserModify = (
  session: Session | null,
  actualId: string | null,
  message: string
) => {
  if (!session || session?.user?.id !== actualId)
    throw new GraphQLError(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
};

export const getSession = async (req: any, res: any) => {
  try {
    res.getHeader = (name: string) => res.headers?.get(name);
    res.setHeader = (name: string, value: string) =>
      res.headers?.set(name, value);
    const session = await getServerSession(req, res, options)
    return session;
  } catch (e) {
    return null;
  }
};

const validateAuthRequirementInQuery = ({
  session,
  body,
}: {
  session: Session | null;
  body: any;
}) => {
  const variables: {
    actualId: string | null;
    public: boolean;
    take: number | null;
  } = {
    actualId: body.variables.creatorId || body.variables.userId || null,
    public: !body.variables.private,
    take: body.variables.take || null
  };
  // Validation of the syntax and necessary clause(s) for the query
  const parsedQuery: any = getParsedQuery(body.query);
  let resolverRequested: string =
    parsedQuery?.definitions[0].selectionSet.selections[0].name.value.toLowerCase();
    const accessibleModels = ["question", "quiz"];
  resolverRequested = (resolverRequested.includes(accessibleModels[0])) ? accessibleModels[0] : (resolverRequested.includes(accessibleModels[1])) ? accessibleModels[1] : resolverRequested;
  const isQuery =
    parsedQuery?.definitions[0].operation.toLowerCase() === "query";
  // Validate of presence of all required variables in the query
  validateVariables(resolverRequested, variables, accessibleModels, isQuery);

  // Validation of session for relevant models
  if (isQuery) {
    switch (resolverRequested) {
      case accessibleModels[0]:
      case accessibleModels[1]:
        if (!variables.public) {
          canUserModify(
            session,
            body.variables.actualId,
            "User is not authorized/authenticated"
          );
        }
        break;
      default:
        canUserModify(
          session,
          variables.actualId,
          "User is not authorized/authenticated"
        );
    }
  } else {
    canUserModify(
      session,
      variables.actualId,
      "User is not authorized/authenticated"
    );
  }
};

export default validateAuthRequirementInQuery;
