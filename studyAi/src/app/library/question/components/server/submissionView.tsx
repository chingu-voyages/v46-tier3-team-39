import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { getSessionData } from "@/app/api/utils/sessionFuncs";
import { Submission } from "../../../../../../prisma/generated/type-graphql";
import { gql, useQuery } from "@apollo/client";
import { Container } from "./containerBar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
const getSubmissionByQuestionId = gql`
  query Submission($questionId: String, $userId: String) {
    submissions(
      where: {
        userId: { equals: $userId }
        questionId: { equals: $questionId }
      }
    ) {
      id
      time
      score
      questionId
      userId
    }
  }
`;
export const SubmissionView = () => {
  const params = useParams();
  const { data: session } = useSession();
  if (!params?.id) return <></>;
  const queryOptions = {
    variables: {
      questionId: params.id,
      userId: session?.user.id,
    },
  };
  const { data: result } = useQuery(getSubmissionByQuestionId, queryOptions);
  // const { data: result } = await ServerGraphQLClient.query(query);
  const data = result as {
    submission: Partial<Submission>[] | Partial<Submission> | null;
  };
  console.log(data);
  if (!data?.submission) return <></>;
  return (
    <Container overflow>
      {Array.isArray(data.submission) &&
        data.submission.map((doc) => <div key={doc.id}></div>)}
    </Container>
  );
};
