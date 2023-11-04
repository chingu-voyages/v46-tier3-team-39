import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import ServerGraphQLClient from "../api/graphql/apolloClient";
import { gql } from "@apollo/client";
import { Question } from "../../../prisma/generated/type-graphql";

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  const QuestionQueryById = gql`
    query Question($id: String) {
      question(where: { id: $id }) {
        id
        questionType
      }
    }`

  const QuestionQueryByUserId = gql`
  query Question {
    readQuestion(id:  "653c05793171c264d005c0b4") {
      id
      questionType
    }
  }`

  const AddQuestionQuery = gql`
  mutation AddQuestion {
    addQuestion(
      questionType: "MCQ",
      tags: ["Geography", "History"],
      questionTitle: "What is the capital of Malaysia?",
      questionDesc: "",
      correctAnswer: ["Kuala Lumpur"],
      incorrectAnswer: ["Penang", "Johor", "Sabah"],
      ) {
        id
        questionType
      }
    }`

  const questionId = "653c05793171c264d005c0b4";
  const query = {
    query: QuestionQueryById,
    variables: { id: questionId },
  };

  const query1 = {
    query: QuestionQueryByUserId,
  };

  const {data: result} = await ServerGraphQLClient.query(query1);
  const data = result as Partial<Question> | null;
  console.log('question', data)

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
