"use client";
import React from "react";
import FullscreenProvider from "@/app/util/providers/FullscreenProvider";
import QuestionPageNavigation, {
  OngoingQuestionBar,
} from "@/app/library/question/components/page/client/questionNavigationBtns";
import QuestionWrapper from "@/app/library/question/components/page/server/questionWrapper";
import QuestionFormWrapper from "@/app/library/question/components/page/client/questionSubmissionForm";
import dynamic from "next/dynamic";
import { useQuestionId } from "../../../context/QuestionIdContext";
//we access local storage here so we render this
//dynamically
const QuestionSubmissionsContainer = dynamic(
  () =>
    import("@/app/stores/questionSubmissionsStore").then(
      (module) => module.QuestionSubmissionsContainer
    ),
  { ssr: false }
);
const QuestionPageContainer = () => {
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  if (questionId) return <></>;
  return (
    <FullscreenProvider>
      <QuestionPageNavigation>
        <QuestionSubmissionsContainer initialItems={[]} questionId={questionId}>
          <QuestionFormWrapper>
            <OngoingQuestionBar
              pagination={{ onPrev: () => {}, onNext: () => {} }}
            />
            <QuestionWrapper />
          </QuestionFormWrapper>
        </QuestionSubmissionsContainer>
      </QuestionPageNavigation>
    </FullscreenProvider>
  );
};
export default QuestionPageContainer;
