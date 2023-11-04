"use client";
import QuestionComponent from "./questionComponents";
import AnswerComponent from "../server/answerComponent";
import useElementPosition from "@/app/util/hooks/useElementSize";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
export const QuestionWrapper = () => {
  const {
    setRef,
    position: { height },
  } = useElementPosition();
  const windowWidth = useWindowWidth();
  return (
    <div
      ref={setRef}
      className="flex w-full flex-col mt-3 mb-5 h-full grow space-y-5 md:flex-row md:space-y-0 md:justify-between"
    >
      <QuestionComponent height={windowWidth < 768 ? undefined : height} />
      <AnswerComponent height={windowWidth < 768 ? undefined : height} />
    </div>
  );
};
