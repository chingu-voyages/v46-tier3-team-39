import { gql } from "../../../graphql/generated";
export const TimeData = gql(`
  fragment TimeData on TimeOptions {
    id
    timeType
    timeTaken
    totalTimeGiven
  }
`);
export const ScoreData = gql(`
  fragment ScoreData on Score {
    id
    maxScore
    actualScore
  }
`);
export const QueryFullQuestionSubmissions = gql(`
  query QueryFullQuestionSubmissions(
    $userId: StringFilter!
    $dateQuery: DateTimeFilter
    $questionId: StringFilter
    $orderBy: [QuestionSubmissionOrderByWithRelationInput!]
    $cursor: QuestionSubmissionWhereUniqueInput
    $skip: Int
  ) {
    questionSubmissions(
      where: {
        userId: $userId
        dateCreated: $dateQuery
        questionId: $questionId
      }
      orderBy: $orderBy
      take: 15
      cursor: $cursor
      skip: $skip
    ) {
      id
      dateCreated
      questionId
      userId
      questionName
      answerProvided {
        id
        value
      }
      time {
       ...TimeData
      }
      score {
       ...ScoreData
      }
      
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

export const GetQuestionSubmissionCountByCreatorId = gql(`
    query AggregateQuestionSubmissionResolver( $creatorId: StringFilter,$dateQuery: DateTimeFilter) {
      aggregateQuestionSubmission(where: {userId: $creatorId, dateCreated: $dateQuery}) {
      _count {userId} 
    }}
  `);
