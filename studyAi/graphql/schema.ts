import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    user(userId: Int): User
  }

  type User {
    userId: Int,
    firstName: String,
    lastName: String,
    email: String
    orders: [Order]
  }

  type Order {
    orderId: Int,
    orderDate: String,
    orderPrice: Float,
    user: User, 
    items: [Item]
  }

  type Item {
    itemId: Int,
    itemName: String,
    itemPrice: Float
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