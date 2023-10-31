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
      className="flex w-full justify-between flex-col mt-10 mb-14  h-full grow space-y-12 sm:space-x-[4%] sm:flex-row sm:space-y-0"
    >
      <QuestionComponent height={windowWidth < 768 ? undefined : height} />
      <AnswerComponent height={windowWidth < 768 ? undefined : height} />
    </div>
  );
};
