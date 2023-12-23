import { gql } from "@/gql/generated";
export const UploadNewQuestionSubmissionQuery = gql(`
  mutation UploadNewQuestionSubmission($questionSubmission: QuestionSubmissionCreateInput!){
    createOneQuestionSubmission(
      data: $questionSubmission
    ){
      id
      dateCreated
      questionId
      questionName
      questionType
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
    }
  }
`);
