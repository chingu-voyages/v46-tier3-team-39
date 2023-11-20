"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { Container } from "../../page/server/containerBar";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { QuestionSubmission } from "@prisma/client";
import SubmissionsListItem from "../../submissions/SubmissionListItem";
import { SortOrder } from "../../../../../../../graphql/generated/graphql";
export const SubmissionView = () => {
  const { data: session } = useSession();
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  if (questionId) return <></>;
  const userId = session ? session.user.id : "";
  const queryOptions = {
    variables: {
      questionId: { equals: questionId === "string" ? questionId : "" },
      userId: userId,
      orderBy: {
        dateCreated: "desc" as SortOrder,
      },
    },
  };
  const { data: result } = useQuery(QueryFullQuestionSubmissions, queryOptions);
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
        data.questionSubmissions.map((doc) => (
          <SubmissionsListItem data={doc} />
        ))}
      {(!Array.isArray(data.questionSubmissions) ||
        data.questionSubmissions.length <= 0) &&
        noDataPlaceholder}
    </Container>
  );
};
