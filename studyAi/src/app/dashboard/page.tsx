import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import GreetingBannerContainer from "./server/greetingBannerContainer";
import Profile from "./server/profile";

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
      {/* <Blah /> */}
      {/* <QuestionEditor /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 border p-5 m-5 ">
        <div className="col-span-1 border md:p-5 md:m-5 md:col-span-1">
          {/* 1 */}
          <Profile />
        </div>
        <div className="col-span-2 ">
          <div className="grid grid-rows-2 ">
            <div className=" row-span-1 border-8 md:p-5 md:m-5 flex ">
              {/* 2.1 */}
              <GreetingBannerContainer />
            </div>
            <div className=" row-span-1 ">
              <div className=" grid grid-cols-1 sm:grid-cols-2 ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  );
}
