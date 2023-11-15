import QuestionComponent from "../../question/client/questionComponents";
import AnswerComponent from "../../answer/client/answerComponent";
const QuestionWrapper = () => {
  return (
    <div className="flex w-full flex-col mt-3 mb-5 h-full grow space-y-5 md:flex-row md:space-y-0 md:justify-between">
      <QuestionComponent />
      <AnswerComponent />
    </div>
  );
};
export default QuestionWrapper;