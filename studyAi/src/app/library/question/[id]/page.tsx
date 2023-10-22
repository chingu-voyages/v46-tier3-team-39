import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import NavigationBtns from "../components/client/navigationBtns";
import QuestionContainer from "../components/server/questionContainer";
import AnswerContainer from "../components/server/answerContainer";
export default function QuestionPage() {
  return (
    <NavigationWrapper
      usePadding
      appBars={{
        footer: true,
        navbar: true,
      }}
    >
      <NavigationBtns />
      <div className="flex w-full justify-between">
        <QuestionContainer />
        <AnswerContainer />
      </div>
      <h1>Question Page</h1>
    </NavigationWrapper>
  );
}
