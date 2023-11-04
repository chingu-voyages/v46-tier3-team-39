import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import ServerGraphQLClient from "../api/graphql/apolloClient";
import { gql, useMutation } from "@apollo/client";
import { Question } from "../../../prisma/generated/type-graphql";

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  // const QuestionQueryById = gql`
  //   query Question($id: String) {
  //     question(where: { id: $id }) {
  //       id
  //       questionType
  //     }
  //   }`

  // const QuestionQueryByUserId = gql`
  // query Question {
  //   readQuestion(id:  "${sessionData.props.session.user.id}") {
  //     id
  //     questionType
  //   }
  // }`

  // const query1 = {
  //   query: QuestionQueryByUserId,
  // };

  // const {data: result} = await ServerGraphQLClient.query(query1);
  // const data = result as Partial<Question> | null;
  // console.log('question', data)

  //   const CREATE_LINK_MUTATION = gql`
  //   mutation PostMutation(
  //     $creatorId: String!
  //     $questionType: String!
  //     $tags: [String!]!
  //     $questionTitle: String!
  //     $questionDesc: String!
  //     $correctAnswer: [String!]!
  //     $incorrectAnswer: [String!]!
  //   ) {
  //     addQuestion(
  //       creatorId: $creatorId,
  //       questionType: $questionType,
  //       tags: $tags,
  //       questionTitle: $questionTitle,
  //       questionDesc: $questionDesc,
  //       correctAnswer: $correctAnswer,
  //       incorrectAnswer: $incorrectAnswer) {
  //       id
  //       creatorId
  //     }
  //   }
  // `;
  // const [createQuestion] = useMutation(CREATE_LINK_MUTATION, {
  //   variables: {
  //     creatorId: "${sessionData.props.session.user.id}",
  //     questionType: "MCQ",
  //     tags: ["Geography", "History"],
  //     questionTitle: "What is the capital of Malaysia?",
  //     questionDesc: "",
  //     correctAnswer: ["Kuala Lumpur"],
  //     incorrectAnswer: ["Penang", "Johor", "Sabah"]
  // }})

  // createQuestion()

  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      Hello
      {/* <QuestionEditor /> */}
    </NavigationWrapper>
  );
}
