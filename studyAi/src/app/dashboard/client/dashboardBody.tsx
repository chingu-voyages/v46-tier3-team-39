"use client";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
import GreetingBanner from "./greetingBanner/greetingBanner";
import ActionCards from "./actionCards/actionCards";

const DashboardBody = () => {
  const windowWidth = useWindowWidth();

  return (
    <ConditionalWrapper
      condition={windowWidth > 768}
      wrapper={(children) => (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-full max-w-screen-lg space-y-6">
            {children}
          </div>
        </div>
      )}
    >
      <GreetingBanner />
      <ActionCards/>
    </ConditionalWrapper>
  );
};

export default DashboardBody;
