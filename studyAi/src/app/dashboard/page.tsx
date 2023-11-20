import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import Profile from "./server/profile";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import GreetingBannerContainer from "./server/greetingBannerContainer";
export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const userId = session?.user.id;
  const userName = session?.user.name;
  if (!userName || !userId) return <></>;
  const { answered: questionsLength, generated: submissionsLength } =
    session.user.questionData;
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
      usePadding
    >
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 m-5 md:gap-5 w-full sm:gap-y-5">
        <div className="col-span-1 border p-5 md:col-span-1">
          {/* 1 */}
          <Profile
            questionCount={questionsLength}
            submissionCount={submissionsLength}
          />
        </div>
        <div className="col-span-2">
          <div className="grid grid-rows-2 ">
            <div className="row-span-1 border p-5 flex w-full">
              {/* 2.1 */}
              <GreetingBannerContainer />
            </div>
            <div className=" row-span-1 flex item-center py-5">
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link href={`/library/question/create`}>
                  <div className=" col-span-1 border p-5 flex flex-col lg:flex-row h-full items-center">
                    {/* 2.2.1 */}
                    <div className="me-2 ">
                      <BsStars size={34} />
                    </div>
                    <div className="flex flex-col">
                      <div className=" font-bold text-xl">
                        Generate Questions
                      </div>
                      <div>
                        Create exam questions using AI ! Use another community
                        question as a template, or upload your own !
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href={`/library/${userId}/questions`}>
                  <div className=" col-span-1 border p-5 h-full flex flex-col lg:flex-row items-center">
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
