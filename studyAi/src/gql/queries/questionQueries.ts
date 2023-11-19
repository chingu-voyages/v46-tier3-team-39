import { gql } from "../../../graphql/generated";

export const GetFullQuestion = gql(`
  query GetFullQuestion($id: String) {
    question(where: { id: $id }) {
      id
      creatorId
      questionType
      tags
      questionInfo {
        id
        title
        description
        options {
          id
          value
        }
      }
      likeCounter {
        id
        likes
        dislikes
      }
    }
  }
`);
export const GetQuestionAnswerById = gql(`
  query GetQuestionAnswerById($id: String) {
    question(where: { id: $id }) {
      id
      answer {
        correctAnswer {
          id
          value
        }
      }
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
      take: 1000
      cursor: $cursor
      skip: $skip
    ) {
      id
      questionType
      tags
      questionInfo{
        title
      }
      private
    }
  }
`);