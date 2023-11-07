import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Session } from "next-auth";
import { GraphQLError, parse } from "graphql";

const getParsedQuery = (queryString: string) => {
  !queryString.includes("where")
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
  accessibleModels: string[]
) => {
  if (
    (accessibleModels.includes(resolverRequested) &&
      variables.public === null) ||
    !variables.actualId ||
    !variables.take
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
    public: boolean | null;
    take: number | null;
  } = {
    actualId: body.variables.creatorId || body.variables.userId || null,
    public: !body.variables.private || null,
    take: body.variables.take || null
  };
  // Validation of the syntax and necessary clause(s) for the query
  const parsedQuery = getParsedQuery(body.query) as any;
  const resolverRequested =
    parsedQuery?.definitions[0].selectionSet.selections[0].name.value;
  const accessibleModels = ["question", "quiz"];
  // Validate of presence of all required variables in the query
  validateVariables(resolverRequested, variables, accessibleModels);
  
  const isQuery =
    parsedQuery?.definitions[0].operation.toLowerCase() === "query";

  // Validation of session for relevant models
  if (isQuery) {
    switch (resolverRequested) {
      case "questions":
      case "quizzes":
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
