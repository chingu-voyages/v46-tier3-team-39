import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import GreetingBanner from "./greetingBanner";
import { sub } from "date-fns";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { Question } from "@prisma/client";
import { QuestionSubmission } from "@prisma/client";
import { GetQuestionsInfo } from "@/gql/queries/questionQueries";
import { QueryQuestionSubmissionsIdOnly } from "@/gql/queries/questionSubmissionQueries";
import { SortOrder } from "../../../../graphql/generated/graphql";
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
    const questions = questionsResult.data.questions.map(
      (e: any) => e.id
    ) as Question["id"][];
    const submissions = submissionsResult.data.questionSubmissions.map(
      (e: any) => e.id
    ) as QuestionSubmission["id"][];
    const uniqueSubmissions = [...new Set(submissions)];
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
    console.error(err?.networkError?.result);
    return <></>;
  }
};
export default GreetingBannerContainer;
