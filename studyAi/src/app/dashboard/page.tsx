import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { DashBoardProvider } from "./context/DashboardContext";
import { sub } from "date-fns";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { GetQuestionsInfo } from "@/gql/queries/questionQueries";
import { QueryQuestionSubmissionsIdOnly } from "@/gql/queries/questionSubmissionQueries";
import { SortOrder } from "../../../graphql/generated/graphql";
import DashBoardWrapper from "./client/dashboardWrapper";
import { Session } from "next-auth";

const getGreetingBannerInfo = async (session: Session, userId: string) => {
  const client = ServerGraphQLClient(session);
  const currDate = new Date();
  const weekPriorDate = sub(currDate, {
    weeks: 1,
  });
  const queryVariables = {
    userId,
    dateQuery: {
      gte: weekPriorDate.toISOString(),
      lte: currDate.toISOString(),
    },
    orderBy: {
      dateCreated: "desc" as SortOrder,
    },
  };
  const questionQuery = {
    query: GetQuestionsInfo,
    variables: {
      ...queryVariables,
      creatorId: { equals: userId },
    },
  };
  const submissionsQuery = {
    query: QueryQuestionSubmissionsIdOnly,
    variables: {
      ...queryVariables,
    },
  };
  const questionPromise = client.query(questionQuery);
  const submissionsPromise = client.query(submissionsQuery);
  try {
    const [questionsResult, submissionsResult] = await Promise.all([
      questionPromise,
      submissionsPromise,
    ]);
    const submissionCount = submissionsResult.data.questionSubmissions.length;
    const questionCount = questionsResult.data.questions.length;
    return { submissionCount, questionCount };
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return { submissionCount: 0, questionCount: 0 };
  }
};

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const userId = session?.user.id;
  const userName = session?.user.name;
  if (!userId || !userName) return <></>;

  const initialProfileData = session.user;
  const { submissionCount, questionCount } = await getGreetingBannerInfo(
    session,
    userId
  );

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
        submissionCount={submissionCount}
        questionCount={questionCount}
      >
        <DashBoardWrapper />
      </DashBoardProvider>
    </NavigationWrapper>
  );
}
