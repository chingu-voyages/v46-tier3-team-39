"use client";
import React from "react";
import FullscreenProvider from "@/app/util/providers/FullscreenProvider";
import QuestionPageNavigation, {
  OngoingQuestionBar,
} from "@/app/library/question/components/page/client/questionNavigationBtns";
import QuestionWrapper from "@/app/library/question/components/page/server/questionWrapper";
import QuestionFormWrapper from "@/app/library/question/components/page/client/questionSubmissionForm";
import { QuestionSubmissionsContainer } from "@/app/stores/questionSubmissionsStore";
const QuestionPageContainer = ({ questionId }: { questionId: string }) => {
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
