import { QuestionSubmission } from "@prisma/client";

const SubmissionsListItem = ({
  data,
}: {
  data: Partial<QuestionSubmission>;
}) => {
  const { questionId } = data;
  return <div></div>;
};
export default SubmissionsListItem;
