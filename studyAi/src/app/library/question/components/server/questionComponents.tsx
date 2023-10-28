import { QuestionView } from "../client/questionView";
import SolutionView from "../client/solutionView";

export const containerTabs = ["description", "solution", "attempts"] as const;
export const InnerContainer = ({ view }: { view: (typeof containerTabs)[number] }) => {
  switch (view) {
    case "description":
      return <QuestionView />;
    case "solution":
      return <SolutionView />;
    case "attempts":
      return <div>attempts</div>;
    default:
      return <QuestionView />;
  }
};
