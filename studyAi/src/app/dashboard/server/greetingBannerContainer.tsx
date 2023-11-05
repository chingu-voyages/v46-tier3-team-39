import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import GreetingBanner from "./greetingBanner";
import { sub } from "date-fns";
import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { Question } from "../../../../prisma/generated/type-graphql";
import { QuestionSubmission } from "@prisma/client";
import { gql } from "../../../../graphql/generated";
const QueryUserGeneratedQuestions = gql(`
  query QueryUserGeneratedQuestions(
    $id: String
    $startDate: DateTimeISO
    $endDate: DateTimeISO
  ) {
    questions(
      where: {
        creatorId: { equals: $id }
        dateCreated: { gte: $startDate, lte: $endDate }
      }
      orderBy: { dateCreated: desc }
    ) {
      id
    }
  }
`);
const QueryQuestionSubmissions = gql(`
  query QueryQuestionSubmissions(
    $id: String
    $startDate: DateTimeISO
    $endDate: DateTimeISO
  ) {
    questionSubmissions(
      where: {
        userId: { equals: $id }
        dateCreated: { gte: $startDate, lte: $endDate }
      }
      orderBy: { dateCreated: desc }
    ) {
      id
    }
  }
`);
const GreetingBannerContainer = async () => {
  const session = await getServerSession(options);
  const userId = session?.user.id;
  const userName = session?.user.name;
  if (!userName || !userId) return <></>;
  const currDate = new Date();
  const weekPriorDate = sub(currDate, {
    weeks: 1,
  });
  const queryVariables = {
    id: userId,
    startDate: weekPriorDate.toISOString(),
    endDate: currDate.toISOString(),
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
  const questionPromise = ServerGraphQLClient.query(questionQuery);
  const submissionsPromise = ServerGraphQLClient.query(submissionsQuery);
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
    console.log(err.networkError.result);
    return <></>;
  }
};
export default GreetingBannerContainer;
