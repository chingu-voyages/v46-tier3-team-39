import { gql } from "@/gql/generated";
export const GetQuestionLikeDoc = gql(`
    query GetQuestionLike($questionId: String!, $userId: String! ) {
        questionLikes(
            where:{
                questionId: {equals: $questionId}
                userId: {equals: $userId}
            }
        ) {
            id
            dislike
        }
    }
`);
