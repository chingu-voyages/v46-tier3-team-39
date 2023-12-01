import { QuestionSubmission } from "@prisma/client";

export const listItemProps = (submission: Partial<QuestionSubmission>) => ({
  key: submission.id,
  dateCreated: submission.dateCreated,
  id: submission.id,
  time: {
    id: submission.time?.id || "",
    timeTaken:
      typeof submission.time?.timeTaken === "number"
        ? submission.time.timeTaken
        : null,
    totalTimeGiven:
      typeof submission.time?.totalTimeGiven === "number"
        ? submission.time?.totalTimeGiven
        : null,
    timeType: submission.time?.timeType || "stopwatch",
  },
  answerProvided: submission.answerProvided,
  score: submission.score,
  questionName: submission.questionName,
  questionId: submission.questionId,
});
