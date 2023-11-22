"use server";
import { getServerSession } from "next-auth";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { options } from "@/authComponents/nextAuth/options";
import { GetQuestionLikeDoc } from "@/gql/queries/questionLikeQueries";
import {
  CreateQuestionLikeDoc,
  EditQuestionLikeDoc,
} from "@/gql/mutations/questionLikeMutation";
import { UpdateQuestionLikeCounter } from "@/gql/mutations/questionMutation";
export const performLikeAction = async (
  type: "like" | "dislike",
  questionId?: string
) => {
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
  if (doc && doc.dislike === Boolean(type === "dislike")) return null;
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
  const [_, questionMutation] = await Promise.all([
    //either an edit or create new like submission doc
    doc?.id ? client.mutate(likeEditOptions) : client.mutate(likeCreateOptions),
    //update question counter in question
    client.mutate(questionMutationVar),
  ]);
  const { data: newQuestionLikeData } = questionMutation;
  return newQuestionLikeData?.updateOneQuestion?.likeCounter;
};
