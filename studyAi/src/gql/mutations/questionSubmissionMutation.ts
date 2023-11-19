import { gql } from "../../../graphql/generated";
export const UploadNewQuestionSubmissionQuery = gql(`
  mutation UploadNewQuestionSubmission($questionSubmission: QuestionSubmissionCreateInput!){
    createOneQuestionSubmission(
      data: $questionSubmission
    ){
      id
    }
  }
`);
