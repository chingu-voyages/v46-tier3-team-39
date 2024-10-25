"use client";
import React from "react";
import FullscreenProvider from "@/frontend/utils/providers/FullscreenProvider";
import QuestionPageNavigation, {
  OngoingQuestionBar,
} from "./questionNavigationBtns";
import QuestionWrapper from "../../../../src/app/library/question/components/page/questionWrapper";
import QuestionFormWrapper from "./forms/questionSubmissionForm";
import { useQuestionId } from "@/frontend/questions/singleQuestion/context/QuestionIdContext";
const QuestionPageContainer = () => {
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  if (!questionId) return <></>;
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
