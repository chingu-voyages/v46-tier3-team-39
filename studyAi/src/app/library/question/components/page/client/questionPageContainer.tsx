"use client";
import React from "react";
import FullscreenProvider from "@/app/util/providers/FullscreenProvider";
import QuestionPageNavigation, {
  OngoingQuestionBar,
} from "@/app/library/question/components/page/client/questionNavigationBtns";
import QuestionWrapper from "@/app/library/question/components/page/server/questionWrapper";
import QuestionFormWrapper from "@/app/library/question/components/page/client/questionSubmissionForm";
import { useQuestionId } from "../../../context/QuestionIdContext";
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
