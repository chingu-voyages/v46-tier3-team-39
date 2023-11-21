import { gql } from "../../../graphql/generated";
export const EditQuestionLikeDoc = gql(`
    mutation EditQuestionLikeDoc($id: String!, $data:QuestionLikeUpdateInput! ) {
        updateOneQuestionLike(
            where:{
                id: $id
            }
            data: $data
        ) {
            id
            dislike
        }
    }
`);
export const CreateQuestionLikeDoc = gql(`
    mutation CreateQuestionLikeDoc($data: QuestionLikeCreateInput!) {
        createOneQuestionLike(
            data: $data
        ){
            id
            dislike
        }
    }
`);
