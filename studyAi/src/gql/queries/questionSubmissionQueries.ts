import { gql } from "../../../graphql/generated";
export const GetSubmissionByQuestionId = gql(`
  query GetQuestionSubmissionByQuestionId($questionId: String, $userId: String ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        questionId: { equals: $questionId }
      }
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
export const QueryQuestionSubmissions = gql(`
  query QueryQuestionSubmissions(
    $userId: String
    $dateQuery: DateTimeFilter
  ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        dateCreated: $dateQuery
      }
      orderBy: { dateCreated: desc }
    ) {
      id
    }
  }
`);
