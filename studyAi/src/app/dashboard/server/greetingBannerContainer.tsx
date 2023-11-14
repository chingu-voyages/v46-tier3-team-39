import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import GreetingBanner from "./greetingBanner";
import { sub } from "date-fns";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
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
  const client = ServerGraphQLClient(session);
  const userId = session?.user.id;
  const userName = session?.user.name;
  console.log("userId: " + JSON.stringify(userId, null, 1));
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
    console.log("questions: " + questions);
    const submissions = submissionsResult.data.questionSubmissions.map(
      (e: any) => e.id
    ) as QuestionSubmission["id"][];
    console.log("submissions: " + submissions);
    const uniqueSubmissions = [...new Set(submissions)];
    console.log("uniqueSubmissions: " + uniqueSubmissions);
    return (
      <div className="flex w-full border-2 border-blue-500">
        <GreetingBanner
          name={userName}
          questionCount={questions.length}
          submissionCount={uniqueSubmissions.length}
        />
      </div>
    );
  } catch (err: any) {
    console.log(err.networkError?.result);
    console.log(err);
    return <>Nothing</>;
  }
};
export default GreetingBannerContainer;
