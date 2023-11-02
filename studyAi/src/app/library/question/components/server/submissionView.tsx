"use client";
import { QuestionSubmission } from "../../../../../../prisma/generated/type-graphql";
import { gql, useQuery } from "@apollo/client";
import { Container } from "./containerBar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
const getSubmissionByQuestionId = gql`
  query Submission($questionId: String, $userId: String) {
    questionSubmissions(
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
  const data = result as {
    questionSubmissions: Partial<QuestionSubmission>[] | Partial<QuestionSubmission> | null;
  };
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center">
      No submissions found
    </label>
  );
  if (!data) return noDataPlaceholder;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {Array.isArray(data.questionSubmissions) &&
        data.questionSubmissions.map((doc) => <div key={doc.id}>{}</div>)}
      {(!Array.isArray(data.questionSubmissions) || data.questionSubmissions.length <= 0) &&
        noDataPlaceholder}
    </Container>
  );
};
