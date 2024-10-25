"use client";
import QuestionComponent from "@/frontend/questions/singleQuestion/questionComponents";
import AnswerComponent from "../answer/answerComponent";
import useElementSize from "@/frontend/hooks/useElementSize";
import useWindowWidth from "@/frontend/hooks/useWindowWidth";
const QuestionWrapper = () => {
  const {
    setRef,
    position: { height },
  } = useElementSize();
  const windowWidth = useWindowWidth();
  return (
    <div
      ref={setRef}
      className="flex w-full flex-col mt-3 mb-5 h-full grow space-y-5 md:flex-row md:space-y-0 md:justify-between"
    >
      <QuestionComponent height={(windowWidth > 780 && height) || undefined} />
      <AnswerComponent height={(windowWidth > 780 && height) || undefined} />
    </div>
  );
};
export default QuestionWrapper;
