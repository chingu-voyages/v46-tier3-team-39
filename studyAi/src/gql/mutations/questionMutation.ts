import { gql } from "../../../graphql/generated";
export const UpdateQuestionLikeCounter = gql(`
  mutation UpdateQuestionLikeCounter(
    $id: String!
    $data: LikeCounterUpdateEnvelopeInput
  ){
    updateOneQuestion(
      where: { id: $id }
      data: {
        likeCounter: $data
      }
    )
    {
      ...QuestionLikeCounterData
    }
  }
`);
export const DeleteQuestionMutation = gql(`
  mutation DeleteSingleQuestion($id: String!, $userId: String!) {
    deleteOneQuestion(
      where: { id: $id, creatorId: { equals: $userId }  }
    ) 
    {
      id
    }
  }
`);
export const AddQuestionMutation = gql(`
  mutation AddSingleQuestion(
    $creatorId: String!,
    $questionType: String!,
    $tags: QuestionCreatetagsInput,
    $questionInfo: QuestionInfoDataCreateEnvelopeInput!,
    $answer: AnswerDataCreateEnvelopeInput!,
    $likeCounter: LikeCounterCreateEnvelopeInput!,
    $private: Boolean!
  ){
    createOneQuestion(
      data: {
        creatorId: $creatorId,
        questionType: $questionType,
        tags: $tags,
        questionInfo: $questionInfo,
        answer: $answer,
        likeCounter: $likeCounter,
        private: $private
      }
    )
    {
      id
    }
  }
`);
