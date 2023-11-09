import { QuestionView } from "../client/questionsView";
import SolutionView from "../client/solutionView";
import { SubmissionView } from "../client/submissionView";
export const containerTabs = ["description", "solution", "attempts"] as const;
export const InnerContainer = ({
  view,
}: {
  view: (typeof containerTabs)[number];
}) => {
  switch (view) {
    case "description":
      return <QuestionView />;
    case "solution":
      return <SolutionView />;
    case "attempts":
      return <SubmissionView />;
    default:
      return <QuestionView />;
  }
};
