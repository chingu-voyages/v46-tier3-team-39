import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import GreetingBannerContainer from "./server/greetingBannerContainer";
import Profile from "./server/profile";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { gql } from "@apollo/client";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Question } from "@prisma/client";
import { QuestionSubmission } from "@prisma/client";
import GreetingBanner from "./server/greetingBanner";
import { sub } from "date-fns";

const QueryUserGeneratedQuestions = gql(`
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

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
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

  let questionsLength : number, submissionsLength : number;
  try {
    const [questionsResult, submissionsResult] = await Promise.all([
      questionPromise,
      submissionsPromise,
    ]);
    const questions = questionsResult.data.questions.map(
      (e: any) => e.id
    ) as Question["id"][];
    console.log("questions: " + questions);
    //convert Number to String and pass to children component
    questionsLength = questions?.length;
    const submissions = submissionsResult.data.questionSubmissions.map(
      (e: any) => e.id
    ) as QuestionSubmission["id"][];
    console.log("submissions: " + submissions);
    const uniqueSubmissions = [...new Set(submissions)];
    console.log("uniqueSubmissions: " + uniqueSubmissions);
    //convert Number to String and pass to children component
    submissionsLength = uniqueSubmissions?.length;
  } catch (err: any) {
    console.error(err?.networkError?.result);
    questionsLength = 0;
    submissionsLength = 0;
  }

  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
      usePadding
    >
      {/* <Blah /> */}
      {/* <QuestionEditor /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 border p-5 m-5 ">
        <div className="col-span-1 border md:p-5 md:m-5 md:col-span-1">
          {/* 1 */}
          <Profile
            questionCount={questionsLength}
            submissionCount={submissionsLength}
          />
        </div>
        <div className="col-span-2 ">
          <div className="grid grid-rows-2 ">
            <div className=" row-span-1 border-8 md:p-5 md:m-5 flex ">
              {/* 2.1 */}
              <div className="flex w-full border-2 border-blue-500">
                <GreetingBanner
                  name={userName}
                  questionCount={questionsLength}
                  submissionCount={submissionsLength}
                />
              </div>
            </div>
            <div className=" row-span-1 ">
              <div className=" grid grid-cols-1 sm:grid-cols-2 ">
                <Link href="/generateQuestion">
                  <div className=" col-span-1 border p-5 md:m-5 flex flex-col lg:flex-row">
                    {/* 2.2.1 */}
                    <div className="me-2 ">
                      <BsStars size={34} />
                    </div>
                    <div className="flex flex-col">
                      <div className=" font-bold text-xl ">
                        Generate Questions
                      </div>
                      <div>
                        Create exam questions using AI ! Use another community
                        question as a template, or upload your own !
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/library/questions">
                  <div className=" col-span-1 border p-5 md:m-5 flex flex-col lg:flex-row">
                    {/* 2.2.2 */}
                    <div className="me-2 ">
                      <FaFileCircleQuestion size={34} />
                    </div>
                    <div className="flex flex-col">
                      <div className=" font-bold text-xl ">Your Questions</div>
                      <div>
                        Choose exams from our community, or create your own
                        variations using any questions you generate or find!
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  );
}
