import { gql } from "../../../graphql/generated";
export const GeneralQuestionData = gql(`
  fragment GeneralQuestionData on Question {
      id
      questionType
      tags
      private
  }
`);
export const QuestionLikeCounterData = gql(`
  fragment QuestionLikeCounterData on Question {
      likeCounter {
        id
        likes
        dislikes
      }
  }
`);
export const QuestionInfoData = gql(`
  fragment QuestionInfoData on Question {
      questionInfo {
        id
        title
        description
        options {
          id
          value
        }
      }
  }
`);
export const QuestionAnswerData = gql(`
  fragment QuestionAnswerData on Question {
    answer {
        id
        correctAnswer {
          id
          value
        }
      }
  }
`);
export const GetQuestionLikeCounterData = gql(`
  query GetQuestionLikeCounterData($id: String) {
    question(where: { id: $id }) {
      ...QuestionLikeCounterData
    }
  }
`);
export const GetFullQuestion = gql(`
  query GetFullQuestion($id: String) {
    question(where: { id: $id }) {
      ...GeneralQuestionData
      ...QuestionInfoData
      ...QuestionLikeCounterData
      creatorId
    }
  }
`);
export const GetQuestionAnswerById = gql(`
  query GetQuestionAnswerById($id: String) {
    question(where: { id: $id }) {
      ...QuestionAnswerData
    }
  }
`);
export const GetQuestionsInfo = gql(`
  query GetQuestionsInfo(
    $dateQuery: DateTimeFilter
    $cursor: QuestionWhereUniqueInput
    $skip: Int
    $private: BoolFilter
    $creatorId: StringFilter
    $orderBy: [QuestionOrderByWithRelationInput!]
  ) {
    questions(
      where: {
        creatorId: $creatorId
        private: $private
        dateCreated: $dateQuery
      }
      orderBy: $orderBy
      take: 15
      cursor: $cursor
      skip: $skip
    ) {
      ...GeneralQuestionData
      ...QuestionLikeCounterData
      questionInfo{
        title
      }
      
    }
  }
`);
