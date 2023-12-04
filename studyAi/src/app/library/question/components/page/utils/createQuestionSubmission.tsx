import { AnswerOption, QuestionSubmission } from "@prisma/client";
import { Session } from "next-auth";
import { QuestionSubmissionCreateInput } from "../../../../../../../graphql/generated/graphql";
import { TimeInputsProps } from "../server/actions";
import { ObjectId } from "bson";
import { GetQuestionAnswerById } from "@/gql/queries/questionQueries";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { AnswerData } from "../../../../../../../prisma/generated/type-graphql";
const getScore = (
  answerProvided: AnswerOption[] | null,
  correctAnswer: AnswerData | null
) => {
  if (!(answerProvided && correctAnswer)) return;
  let score = 0;
  for (const chosen of answerProvided) {
    for (const correctOptions of correctAnswer?.correctAnswer) {
      if (chosen.value === correctOptions.value) score++;
    }
  }
  return score;
};
const createQuestionSubmissionDoc = async ({
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
  const answerQuery = {
    query: GetQuestionAnswerById,
    variables: { id: submission.questionId },
  };
  let actualScore = null;
  let maxScore = null;

  try {
    const client = ServerGraphQLClient(session);
    const answerPromise = client.query(answerQuery);
    const [{ data: answer }] = await Promise.all([answerPromise]);
    const answerData = answer.question?.answer as
      | (AnswerData & { id: string })
      | null;
    actualScore = getScore(submission.answerProvided || null, answerData);
    maxScore = answerData?.correctAnswer.length;
  } catch (err) {
    console.error(err);
  }

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
    // score: {
    //   id: new ObjectId().toString(),
    //   maxScore,
    //   actualScore,
    // },
  };
  return newSubmission;
};
export default createQuestionSubmissionDoc;
