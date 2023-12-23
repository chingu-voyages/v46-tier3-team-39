"use server";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { getServerSession } from "next-auth";
import { options } from "@/authComponents/nextAuth/options";
import { GetQuestionLikeDoc } from "@/gql/queries/questionLikeQueries";
import {
  CreateQuestionLikeDoc,
  EditQuestionLikeDoc,
} from "@/gql/mutations/questionLikeMutation";
import { UpdateQuestionLikeCounter } from "@/gql/mutations/questionMutation";
import {
  CreateQuestionLikeDocMutation,
  EditQuestionLikeDocMutation,
} from "@/gql/generated/graphql";
import { Question, QuestionLike, QuestionSubmission } from "@prisma/client";
export const performLikeAction = async (
  type: "like" | "dislike",
  questionId?: string
): Promise<
  | [
      Pick<QuestionLike, "id" | "dislike"> | undefined | null,
      Question["likeCounter"] | undefined | null
    ]
  | null
  | undefined
> => {
  const session = await getServerSession(options);
  if (!session || !questionId) return null;
  const userId = session.user.id;
  const client = ServerGraphQLClient(session);
  //check if user id like exists
  const { data: result } = await client.query({
    query: GetQuestionLikeDoc,
    variables: {
      userId,
      questionId,
    },
  });
  const currDate = new Date();
  const doc =
    result.questionLikes && result.questionLikes.length > 0
      ? result.questionLikes[0]
      : null;
  //if record exists with same value, ignore call.
  if (doc && doc.dislike === (type === "dislike")) return null;
  //configure question like mutation options
  const newQuestionLikeDocOptions = {
    dateCreated: { set: currDate },
    questionId,
    userId,
    dislike: type === "dislike",
  };
  const editQuestionLikeDocOptions = {
    id: doc?.id || "",
    data: {
      dislike: { set: type === "dislike" },
      dateCreated: { set: currDate },
    },
  };
  const likeEditOptions = {
    mutation: EditQuestionLikeDoc,
    variables: editQuestionLikeDocOptions,
  };
  const likeCreateOptions = {
    mutation: CreateQuestionLikeDoc,
    variables: { data: newQuestionLikeDocOptions },
  };
  //configure question like counter mutation options
  const questionMutationVar = {
    mutation: UpdateQuestionLikeCounter,
    variables: {
      id: questionId,
      data: {
        update: {
          likes:
            type === "like"
              ? {
                  increment: 1,
                }
              : //if record existed before, we must decrement counter
              doc?.id
              ? {
                  decrement: 1,
                }
              : undefined,
          dislikes:
            type === "dislike"
              ? {
                  increment: 1,
                }
              : //if record existed before, we must decrement counter
              doc?.id
              ? {
                  decrement: 1,
                }
              : undefined,
        },
      },
    },
  };
  const [userLikeMutation, questionMutation] = await Promise.all([
    //either an edit or create new like submission doc
    doc?.id ? client.mutate(likeEditOptions) : client.mutate(likeCreateOptions),
    //update question counter in question
    client.mutate(questionMutationVar),
  ]);
  const { data: newQuestionLikeData } = questionMutation;
  const { data: userLikeData } = userLikeMutation;
  const userLikeMutationResult = userLikeData as
    | (CreateQuestionLikeDocMutation & EditQuestionLikeDocMutation)
    | null
    | undefined;
  const userLikeResult = userLikeMutationResult?.updateOneQuestionLike
    ? userLikeMutationResult.updateOneQuestionLike
    : userLikeMutationResult?.createOneQuestionLike;
  const questionDataResult =
    newQuestionLikeData?.updateOneQuestion?.likeCounter;
  return [userLikeResult, questionDataResult];
};
