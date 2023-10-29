import { QuestionView } from "../client/questionsView";
import SolutionView from "../client/solutionView";
import { SubmissionView } from "./submissionView";
export const containerTabs = ["description", "solution", "attempts"] as const;
export const InnerContainer = ({
  view,
  params,
}: {
  view: (typeof containerTabs)[number];
  params: { id: string };
}) => {
  switch (view) {
    case "description":
      return <QuestionView />;
    case "solution":
      return <SolutionView />;
    case "attempts":
      return <SubmissionView params={params} />;
    default:
      return <QuestionView />;
  }
};
