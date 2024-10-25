"use client";
import useWindowWidth from "../hooks/useWindowWidth";
import ConditionalWrapper from "../utils/components/conditionalWrapper/conditionalWrapper";
import GreetingBanner from "./greetingBanner/greetingBanner";
import ActionCards from "./actionCards/actionCards";
import RecentQuestionSubmissionsListContainer from "./recentSubmissions/RecentSubmissions";
const DashboardBody = () => {
  const windowWidth = useWindowWidth();
  return (
    <ConditionalWrapper
      condition={windowWidth > 768}
      wrapper={(children) => (
        <div className="flex flex-col items-center w-full border-l md:pl-[3%]">
          <div className="flex flex-col w-full max-w-screen-lg space-y-6">
            {children}
          </div>
        </div>
      )}
    >
      <div className="md:mt-6 flex flex-col w-full">
        <GreetingBanner />
      </div>
      <ActionCards />
      <div className={`flex flex-col w-full pb-6`}>
        <RecentQuestionSubmissionsListContainer />
      </div>
    </ConditionalWrapper>
  );
};

export default DashboardBody;
