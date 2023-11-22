"use server";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import { Question } from "@prisma/client";
import { ObjectId } from "bson";
import { AddQuestionMutation } from "@/gql/mutations/questionMutation";
import { UpdateUserData } from "@/gql/mutations/userMutation";
export const uploadQuestionToDb = async ({
  questionData,
}: {
  questionData: Partial<Question>;
}) => {
  const session = await getServerSession(options);
  if (!session) return null;
  const client = ServerGraphQLClient(session);
  const creatorId = session.user.id;
  const variables = {
    questionType: questionData?.questionType
      ? questionData.questionType
      : "Short Answer",
    tags: {
      set: questionData?.tags ? questionData.tags : [],
    },
    questionInfo: {
      set: questionData?.questionInfo
        ? {
            ...questionData.questionInfo,
          }
        : {
            id: new ObjectId().toString(),
            title: "",
            description: "",
            options: [],
          },
    },
    creatorId: creatorId ? creatorId : "",
    likeCounter: {
      set: {
        id: new ObjectId().toString(),
        likes: 0,
        dislikes: 0,
      },
    },
    answer: {
      set: {
        id: new ObjectId().toString(),
        correctAnswer: questionData?.answer?.correctAnswer
          ? questionData?.answer?.correctAnswer
          : [],
      },
    },
    private: !!questionData?.private,
  };
  const [questionResult, _] = await Promise.all([
    //update question doc
    client.mutate({
      mutation: AddQuestionMutation,
      variables: variables,
    }),
    //increment user data count
    client.mutate({
      mutation: UpdateUserData,
      variables: {
        id: creatorId,
        data: {
          questionData: {
            update: {
              generated: {
                increment: 1,
              },
            },
          },
        },
      },
    }),
  ]);
  const newId = questionResult.data?.createOneQuestion.id;
  const newQuestion = {
    ...questionData,
    id: newId ? newId : questionData.id,
  };
  return newQuestion;
};
