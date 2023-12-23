"use server";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import { Question } from "@prisma/client";
import ObjectId from "bson-objectid";
import {
  AddQuestionMutation,
  UpdateQuestionMutation,
} from "@/gql/mutations/questionMutation";
import { UpdateUserData } from "@/gql/mutations/userMutation";
import {
  AddSingleQuestionMutation,
  UpdateSingleQuestionMutation,
} from "@/gql/generated/graphql";
import { GetQuestionCreator } from "@/gql/queries/questionQueries";
import removeTypename from "../../parsers/removeTypename";
export const uploadQuestionToDb = async (data: {
  questionData: Partial<Question>;
  questionId?: string;
}) => {
  const { questionData, questionId } = data;
  const session = await getServerSession(options);
  if (!session) return null;
  const client = ServerGraphQLClient(session);
  const creatorId = session.user.id;
  if (questionId) {
    //check user has access to edit document
    const { data: doc } = await client.query({
      query: GetQuestionCreator,
      variables: {
        id: questionId,
      },
    });
    if (doc?.question?.creatorId !== creatorId || typeof creatorId !== "string")
      return null;
  }
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
            id: questionData.questionInfo.id,
            title: questionData.questionInfo.title,
            description: questionData.questionInfo.description,
            options: questionData.questionInfo.options,
          }
        : {
            id: ObjectId().toString(),
            title: "",
            description: "",
            options: [],
          },
    },
    creatorId: creatorId ? creatorId : "",
    likeCounter: {
      set: {
        id: ObjectId().toString(),
        likes: 0,
        dislikes: 0,
      },
    },
    answer: {
      set: {
        id: ObjectId().toString(),
        correctAnswer: questionData?.answer?.correctAnswer
          ? questionData?.answer?.correctAnswer.map((e) => ({
              id: e.id,
              value: e.value,
            }))
          : [],
      },
    },
    private: !!questionData?.private,
  };
  const updateQuestionVariables = questionId
    ? {
        id: questionId,
        questionInfo: questionData.questionInfo
          ? {
              update: {
                title: questionData.questionInfo.title
                  ? { set: questionData.questionInfo.title }
                  : undefined,
                description: questionData.questionInfo.description
                  ? { set: questionData.questionInfo.description }
                  : undefined,
                options: questionData.questionInfo.options,
              },
            }
          : undefined,
        answer:
          questionData.answer && questionData.answer.correctAnswer
            ? {
                update: {
                  correctAnswer: questionData.answer.correctAnswer,
                },
              }
            : undefined,
        tags: questionData.tags
          ? {
              set: questionData.tags,
            }
          : undefined,
        questionType: questionData.questionType
          ? { set: questionData.questionType }
          : undefined,
        private:
          typeof questionData.private === "boolean"
            ? { set: questionData.private }
            : undefined,
      }
    : null;
  const filteredUpdateQuestionVariables = updateQuestionVariables
    ? removeTypename(updateQuestionVariables)
    : null;
  const filteredCreateQuestionVariables = removeTypename(variables);
  const [questionResult, _] = await Promise.all([
    //update question doc
    //if question id is present, update the question doc
    questionId && filteredUpdateQuestionVariables
      ? client.mutate({
          mutation: UpdateQuestionMutation,
          variables: filteredUpdateQuestionVariables,
        })
      : client.mutate({
          mutation: AddQuestionMutation,
          variables: filteredCreateQuestionVariables,
        }),
    //increment user data count since this is a new question
    !questionId
      ? client.mutate({
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
        })
      : {},
  ]);
  if (!questionResult.data) return null;
  const newData = questionResult.data as (
    | UpdateSingleQuestionMutation
    | AddSingleQuestionMutation
  ) & {
    createOneQuestion?: { id: string };
    updateOneQuestion?: { id: string };
  };
  const newId = newData.createOneQuestion?.id || newData.updateOneQuestion?.id;
  const newQuestion = {
    ...questionData,
    id: newId ? newId : questionData.id,
  };
  return newQuestion;
};
