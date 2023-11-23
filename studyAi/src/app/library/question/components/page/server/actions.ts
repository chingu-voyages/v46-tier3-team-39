"use server";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import createQuestionSubmissionDoc from "../utils/createQuestionSubmission";
import { QuestionSubmission } from "@prisma/client";
import { UploadNewQuestionSubmissionQuery } from "@/gql/mutations/questionSubmissionMutation";
import { UpdateUserData } from "@/gql/mutations/userMutation";
export const uploadQuestionSubmisison = async ({
  event,
  submission,
}: {
  event: React.FormEvent<HTMLFormElement>;
  submission: Partial<QuestionSubmission>;
}) => {
  const session = await getServerSession(options);
  const userId = session?.user?.id;
  if (!userId) return;
  const client = ServerGraphQLClient(session);
  const questionSubmission = createQuestionSubmissionDoc({
    session: session,
    event,
    submission,
  });
  if (!questionSubmission) return null;
  const questionSubmissionMutationOptions = {
    mutation: UploadNewQuestionSubmissionQuery,
    variables: {
      questionSubmission,
    },
  };
  const userAnsweredMutationOptions = {
    mutation: UpdateUserData,
    variables: {
      id: userId,
      data: {
        questionData: {
          update: {
            answered: {
              increment: 1,
            },
          },
        },
      },
    },
  };
  const [newQuestionSubmission, _] = await Promise.all([
    client.mutate(questionSubmissionMutationOptions),
    client.mutate(userAnsweredMutationOptions),
  ]);
  return newQuestionSubmission.data;
};
