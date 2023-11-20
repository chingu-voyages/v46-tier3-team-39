import { gql } from "../../../graphql/generated";
export const QueryFullQuestionSubmissions = gql(`
  query QueryFullQuestionSubmissions(
    $userId: String!
    $dateQuery: DateTimeFilter
    $questionId: StringFilter
    $orderBy: [QuestionSubmissionOrderByWithRelationInput!]
  ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        dateCreated: $dateQuery
        questionId: $questionId
      }
      orderBy: $orderBy
    ) {
      id
      time {
        id
        timeType
        timeTaken
        totalTimeGiven
      }
      score {
        id
        maxScore
        actualScore
      }
      questionId
      userId
    }
  }
`);
export const QueryQuestionSubmissionsIdOnly = gql(`
  query QueryQuestionSubmissionsId(
    $userId: String!
    $dateQuery: DateTimeFilter
    $questionId: StringFilter
    $orderBy: [QuestionSubmissionOrderByWithRelationInput!]
  ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        dateCreated: $dateQuery
        questionId: $questionId
      }
      orderBy: $orderBy
    ) {
      id
    }
  }
`);