import { gql } from "../../../graphql/generated";
export const UpdateUserData = gql(`
    mutation UpdateUserData($id: String!,$data: UserUpdateInput!) {
        updateOneUser(
            where: {
                id: $id
            }
            data: $data
        ){
            id
        }
    }
`);
