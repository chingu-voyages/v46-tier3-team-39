import { gql } from "../../../backend/gql/generated";
export const AddSubscriber = gql(`
  mutation AddSubscriber($email: String!) {
    createOneSubscriber(data: {
      email: $email
    })
    {
      id
    }
  }
`);
