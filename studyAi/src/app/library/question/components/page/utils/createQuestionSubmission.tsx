import { QuestionSubmission } from "@prisma/client";
import { Session } from "next-auth";
import { QuestionSubmissionCreateInput } from "../../../../../../../graphql/generated/graphql";
import { TimeInputsProps } from "../server/actions";
const createQuestionSubmissionDoc = ({
  session,
  submission,
  timeInputs,
}: {
  timeInputs: TimeInputsProps;
  session: Session | null;
  submission: Partial<QuestionSubmission>;
}) => {
  const { timeInputType, timeTaken, totalTimeGiven } = timeInputs;
  if (!session) return;
  const newSubmission: QuestionSubmissionCreateInput = {
    userId: session.user.id,
    questionId: submission.questionId as string,
    dateCreated: new Date(),
    questionName: submission.questionName as string,
    time:
      typeof timeInputType === "string" && typeof timeTaken === "string"
        ? {
            set: {
              timeType: timeInputType.toString(),
              timeTaken: parseInt(timeTaken),
              totalTimeGiven:
                typeof totalTimeGiven === "string"
                  ? parseInt(totalTimeGiven)
                  : null,
            },
          }
        : null,
    answerProvided: submission.answerProvided,
  };
  return newSubmission;
};
export default createQuestionSubmissionDoc;
