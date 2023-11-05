import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import ServerGraphQLClient from "../api/graphql/apolloClient";
import { Question } from "../../../prisma/generated/type-graphql";
import GreetingBanner from "./server/greetingBannerContainer";
import Profile from "./server/profile";
import { gql } from 'graphql-tag';
const QuestionQueryById = gql`
  query QuestionQueryById($id: String) {
    questions(where: { creatorId: { equals: $id } }) {
      id
      questionType
    }
  }
`;
export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
      usePadding
    >
      {/* <Profile /> */}
      {/* <GreetingBanner /> */}
      {/* <QuestionEditor /> */}
    </NavigationWrapper>
  );
}
