"use client";
import { NavigationBtns, PaginationOptions } from "./navigationBtns";
import { QuestionWrapper } from "./questionWrapper";
import { TimeComponent } from "./timeComponent";
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
const QuestionPageContainer = () => {
  return (
    <QuestionFormWrapper>
      <OngoingQuestionBar pagination={{ onPrev: () => {}, onNext: () => {} }} />
      <QuestionWrapper />
    </QuestionFormWrapper>
  );
};
export default QuestionPageContainer;
