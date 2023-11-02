import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { getSessionData } from "@/app/api/utils/sessionFuncs";
import { gql } from "@apollo/client";
import { Submissions } from "../../../../../../prisma/generated/type-graphql";
import { Container } from "./containerBar";
const getSubmissionByQuestionId = gql`
  query Submissions($questionId: String, $userId: String) {
    submission(where: { userId: $userId, questionId: $questionId }) {
      id
      time
      score
      questionId
      userId
    }
  }
`;
export const SubmissionView = async ({
  params,
}: {
  params: { id: string };
}) => {
  const session = await getSessionData();
  const query = {
    query: getSubmissionByQuestionId,
    variables: {
      questionId: params.id,
      userId: session?.user.id,
    },
  };
  const { data: result } = await ServerGraphQLClient.query(query);
  const data = result as { submission: Partial<Submissions>[] | null };
  if (!data.submission) return <></>;
  return (
    <Container overflow>
      {data.submission.map((doc) => (
        <div key={doc.id}></div>
      ))}
    </Container>
  );
};
