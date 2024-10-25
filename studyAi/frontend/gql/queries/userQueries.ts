import { gql } from "../../../backend/gql/generated";
export const GetUserInfo = gql(`
  query GetUserInfo($userId: String!){
    user(where:{id:$userId}){
      id
      name
    }
  }
`);
