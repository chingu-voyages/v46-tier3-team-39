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

// import { connectionPlugin, makeSchema } from 'nexus';
// import { join } from 'path';
// import * as types from './types';

// export const schema = makeSchema({
//   plugins: [connectionPlugin()],
//   types,
//   outputs: {
//     typegen: join(process.cwd(), 'generated/nexus-typegen.ts'),
//     schema: join(process.cwd(), 'generated/schema.graphql')
//   }
// });