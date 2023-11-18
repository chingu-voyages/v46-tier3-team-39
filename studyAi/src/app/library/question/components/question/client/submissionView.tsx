"use client";
import { QuestionSubmission } from "../../../../../../../prisma/generated/type-graphql";
import { useQuery } from "@apollo/client";
import { Container } from "../../page/server/containerBar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { gql } from "../../../../../../../graphql/generated";
import { useQuestionId } from "../../../context/QuestionIdContext";
const getSubmissionByQuestionId = gql(`
  query GetQuestionSubmissionByQuestionId($questionId: String, $userId: String ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        questionId: { equals: $questionId }
      }
    ) {
      id
      time {
        timeType
        timeTaken
        totalTimeGiven
      }
      score {
        maxScore
        actualScore
      }
      questionId
      userId
    }
  }
`);
export const SubmissionView = () => {
  const params = useParams();
  const { data: session } = useSession();
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  if (!params?.id) return <></>;
  const userId = session ? session.user.id : "";
  const queryOptions = {
    variables: {
      questionId: questionId === "string" ? questionId : '',
      userId: userId,
    },
  };
  const { data: result } = useQuery(getSubmissionByQuestionId, queryOptions);
  const data = result as {
    questionSubmissions:
      | Partial<QuestionSubmission>[]
      | Partial<QuestionSubmission>
      | null;
  };
  const noDataPlaceholder = (
    <label className="text-Black flex h-full w-full items-center justify-center grow py-5">
      No submissions found
    </label>
  );
  if (!session || !data) return noDataPlaceholder;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {Array.isArray(data.questionSubmissions) &&
        data.questionSubmissions.map((doc) => <div key={doc.id}>{}</div>)}
      {(!Array.isArray(data.questionSubmissions) ||
        data.questionSubmissions.length <= 0) &&
        noDataPlaceholder}
    </Container>
  );
};
