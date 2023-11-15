import React from "react";
import { QuestionSubmission } from "@prisma/client";
import { Session } from "next-auth";
import { QuestionSubmissionCreateInput } from "../../../../../../../graphql/generated/graphql";
const createQuestionSubmissionDoc = ({
  session,
  submission,
  event,
}: {
  event: React.FormEvent<HTMLFormElement>;
  session: Session | null;
  submission: Partial<QuestionSubmission>;
}) => {
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());
  const { timeInputType, timeTaken, totalTimeGiven } = data;
  if (!session) return;
  const newSubmission: QuestionSubmissionCreateInput = {
    userId: session.user.id,
    questionId: submission.questionId as string,
    dateCreated: new Date(),
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
//grab uncontrolled inputs here form
// const formData = new FormData(event.currentTarget);
// const data = Object.fromEntries(formData.entries());
// const questionType = question.questionType;
// const {
//   selectMultipleSelections,
//   shortAnswer,
//   multipleChoiceAnswer,
//   timeInputType,
//   timeTaken,
//   totalTimeGiven,
// } = data;
//we can't save a question submission if there is no session
// if (!session) return;
// let parsedArr: QuestionSubmission["answerProvided"] | null = null;
// switch (questionType) {
//   case "Multiple Choice":
//     try {
//       parsedArr = JSON.parse(
//         multipleChoiceAnswer.toString()
//       ) as QuestionSubmission["answerProvided"];
//     } catch (err) {
//       console.error(err);
//     }
//     break;
//   case "Short Answer":
//     try {
//       parsedArr = JSON.parse(
//         shortAnswer.toString()
//       ) as QuestionSubmission["answerProvided"];
//     } catch (err) {
//       console.error(err);
//     }
//     break;
//   case "Select Multiple":
//     try {
//       parsedArr = JSON.parse(
//         selectMultipleSelections.toString()
//       ) as QuestionSubmission["answerProvided"];
//     } catch (err) {
//       console.error(err);
//     }
//     break;
//   default:
//     return null;
// }
// if (!parsedArr) return null;
