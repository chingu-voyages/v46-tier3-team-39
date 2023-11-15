import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import GreetingBanner from "./greetingBanner";
import { sub } from "date-fns";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { Question } from "../../../../prisma/generated/type-graphql";
import { QuestionSubmission } from "@prisma/client";
import { gql } from "../../../../graphql/generated";
export const QueryUserGeneratedQuestions = gql(`
  query QueryUserGeneratedQuestions(
    $userId: String
    $dateQuery: DateTimeFilter
    $cursor: QuestionWhereUniqueInput
    $skip: Int
  ) {
    questions(
      where: {
        creatorId: { equals: $userId }
        dateCreated: $dateQuery
      }
      orderBy: { dateCreated: desc }
      take: 1000
      cursor: $cursor
      skip: $skip
    ) {
      id
      questionType
      tags
      questionInfo{
        title 
      }
      private
    }
  }
`);
const QueryQuestionSubmissions = gql(`
  query QueryQuestionSubmissions(
    $userId: String
    $dateQuery: DateTimeFilter
  ) {
    questionSubmissions(
      where: {
        userId: { equals: $userId }
        dateCreated: $dateQuery
      }
      orderBy: { dateCreated: desc }
    ) {
      id
    }
  }
`);
const GreetingBannerContainer = async () => {
  const session = await getServerSession(options);
  const client = ServerGraphQLClient(session);
  const userId = session?.user.id;
  const userName = session?.user.name;
  if (!userName || !userId) return <></>;
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
  };
  const questionQuery = {
    query: QueryUserGeneratedQuestions,
    variables: {
      ...queryVariables,
    },
  };
  const submissionsQuery = {
    query: QueryQuestionSubmissions,
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
    const questions = questionsResult.data.questions.map(
      (e: any) => e.id
    ) as Question["id"][];
    const submissions = submissionsResult.data.questionSubmissions.map(
      (e: any) => e.id
    ) as QuestionSubmission["id"][];
    const uniqueSubmissions = [...new Set(submissions)];
    return (
      <GreetingBanner
        name={userName}
        questionCount={questions.length}
        submissionCount={uniqueSubmissions.length}
      />
    );
  } catch (err: any) {
    console.error(err?.networkError?.result);
    return <></>;
  }
};
export default GreetingBannerContainer;
