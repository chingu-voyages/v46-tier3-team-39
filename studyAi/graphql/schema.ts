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