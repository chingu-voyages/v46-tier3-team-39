"use client";
import React from "react";
import { NavigationBtns, PaginationOptions } from "./navigationBtns";
import { QuestionWrapper } from "../server/questionWrapper";
import { TimeComponent } from "../../time/client/timeModal";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import FullscreenProvider, {
  useFullscreen,
} from "@/app/util/providers/FullscreenProvider";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { QuestionSubmission } from "../../../../../../../prisma/generated/type-graphql";
import { useSession } from "next-auth/react";
import { gql } from "../../../../../../../graphql/generated";

const UploadNewQuestionSubmissionQuery = gql(`
  mutation UploadNewQuestionSubmission($userId: String, $questionSubmission: QuestionSubmissionCreateInput!) {
    createOneQuestionSubmission(
      data: $questionSubmission
    ){
      id
    }
  }
`);
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
  //define hooks
  const session = useSession();
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  if (!question) return <></>;
  const questionType = question.questionType;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //grab uncontrolled inputs here form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const {
      selectMultipleSelections,
      shortAnswer,
      multipleChoiceAnswer,
      timeInputType,
      timeTaken,
      totalTimeGiven,
    } = data;

    //we can't save a question submission if there is no session
    if (!session.data) return;
    const newSubmission: Partial<QuestionSubmission> &
      Omit<QuestionSubmission, "id" | "answerProvided" | "score"> = {
      userId: session.data.user.id,
      questionId: question.id as string,
      dateCreated: new Date(),
      // time: typeof timeInputType === 'string' && typeof timeTaken === 'string' && typeof totalTimeGiven === '' {
      //   timeType: ,
      //   timeTaken: ,
      //   totalTimeGiven: ,
      // }
    };
    console.log(data);
    switch (questionType) {
      case "Multiple Choice":
        break;
      case "Short Answer":
        break;
      case "Select Multiple":
        break;
      default:
        return;
    }
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
