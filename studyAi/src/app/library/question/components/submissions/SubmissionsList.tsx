import { SubmissionListProvider } from "./context/SubmissionsListProvider";

const SubmissionsList = ({
  layout,
  children,
}: {
  layout: "page" | "tabbed";
  children: React.ReactNode;
}) => {
  return (
    <SubmissionListProvider layout={layout}>
      <div className="flex flex-col"></div>
    </SubmissionListProvider>
  );
};
