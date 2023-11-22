import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { DashBoardProvider } from "./context/DashboardContext";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { GetQuestionCountByCreatorId } from "@/gql/queries/questionQueries";
import { GetQuestionSubmissionCountByCreatorId } from "@/gql/queries/questionSubmissionQueries";
import DashBoardWrapper from "./server/dashboardWrapper";
import { Session } from "next-auth";
import { subWeeks } from "date-fns";
export const generateMetadata = () => {};

const getGreetingBannerInfo = async (session: Session, userId: string) => {
  const currDate = new Date();
  const client = ServerGraphQLClient(session);
  const variables = {
    creatorId: { equals: userId },
    dateQuery: {
      gte: subWeeks(currDate, 1).toISOString(),
      lte: currDate.toISOString(),
    },
  };
  const questionQuery = {
    query: GetQuestionCountByCreatorId,
    variables,
  };
  const submissionsQuery = {
    query: GetQuestionSubmissionCountByCreatorId,
    variables,
  };
  const questionPromise = client.query(questionQuery);
  const submissionsPromise = client.query(submissionsQuery);

  try {
    const [questionsResult, submissionsResult] = await Promise.all([
      questionPromise,
      submissionsPromise,
    ]);
    const weeklySubmissionCount =
      submissionsResult.data.aggregateQuestionSubmission._count?.userId;
    const weeklyQuestionCount =
      questionsResult.data.aggregateQuestion._count?.creatorId;
    return { weeklySubmissionCount, weeklyQuestionCount };
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return { weeklySubmissionCount: 0, weeklyQuestionCount: 0 };
  }
};

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const userId = session?.user.id;
  const userName = session?.user.name;
  if (!userId || !userName) return <></>;

  const initialProfileData = session.user;
  const { weeklySubmissionCount, weeklyQuestionCount } =
    await getGreetingBannerInfo(session, userId);

  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
      usePadding
    >
      <DashBoardProvider
        initialProfileData={initialProfileData}
        weeklySubmissionCount={weeklySubmissionCount || 0}
        weeklyQuestionCount={weeklyQuestionCount || 0}
      >
        <DashBoardWrapper />
      </DashBoardProvider>
    </NavigationWrapper>
  );
}
