import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Question {
    id: ID!
    creatorId: String!
    type: String!
    tags: [String!]!
    question: {
      title: String!
      description: String!
    }
    answer: {
      answer: String!
    }
    likeCounter: {
      likes: Number!
      dislikes: Number!
    }
    type Query {
      questions: [Question!]!
      questionById(id: ID!): Question!
    }
  }
`;