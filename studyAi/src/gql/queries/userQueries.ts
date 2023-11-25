import { gql } from "../../../graphql/generated";
export const GetUserInfo = gql(`
  query GetUserInfo($userId: String!){
    user(where:{id:$userId}){
      id
      name
    }
  }
`);
