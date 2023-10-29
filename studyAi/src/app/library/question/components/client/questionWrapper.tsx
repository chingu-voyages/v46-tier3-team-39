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
    <div ref={setRef} className="flex w-full justify-between my-10 h-full grow">
      <QuestionComponent height={windowWidth < 768 ? undefined : height} />
      <AnswerComponent height={windowWidth < 768 ? undefined : height} />
    </div>
  );
};
