"use client";
import React from "react";
import { NavigationBtns, PaginationOptions } from "./navigationBtns";
import { QuestionWrapper } from "./questionWrapper";
import { TimeComponent } from "./timeModal";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import FullscreenProvider, {
  useFullscreen,
} from "@/app/util/providers/FullscreenProvider";
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}) => {
  return condition ? wrapper(children) : children;
};
const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { email } = data;
  };
  return (
    <form className="flex flex-col w-full grow h-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
const OngoingQuestionBar = ({
  pagination,
}: {
  pagination?: PaginationOptions;
}) => {
  if (pagination)
    return (
      <NavigationBtns pagination={pagination}>
        <TimeComponent />
      </NavigationBtns>
    );
  return (
    <div className="h-10 mt-1">
      <TimeComponent />
    </div>
  );
};
const QuestionPageNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isFullscreen } = useFullscreen();
  return (
    <ConditionalWrapper
      condition={!isFullscreen}
      wrapper={(children: React.ReactNode) => (
        <NavigationWrapper
          usePadding
          appBars={{
            footer: false,
            navbar: true,
          }}
        >
          {children}
        </NavigationWrapper>
      )}
    >
      <ConditionalWrapper
        condition={isFullscreen}
        wrapper={(children: React.ReactNode) => (
          <div className="flex flex-col min-h-screen bg-White text-Black px-[5%] py-[2%]">
            {children}
          </div>
        )}
      >
        {children}
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
};
const QuestionPageContainer = () => {
  return (
    <FullscreenProvider>
      <QuestionPageNavigation>
        <QuestionFormWrapper>
          <OngoingQuestionBar
            pagination={{ onPrev: () => {}, onNext: () => {} }}
          />
          <QuestionWrapper />
        </QuestionFormWrapper>
      </QuestionPageNavigation>
    </FullscreenProvider>
  );
};
export default QuestionPageContainer;
