"use client";
import React, { useRef } from "react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { gql } from "../../../../../../../graphql/generated";
import { ObjectId } from "bson";
import { Question } from "@prisma/client";
import { Session } from "next-auth";
import { useMutation } from "@apollo/client";
import { QuestionSubmissionCreateInput } from "../../../../../../../graphql/generated/graphql";
const UploadNewQuestionSubmissionQuery = gql(`
  mutation UploadNewQuestionSubmission($questionSubmission: QuestionSubmissionCreateInput!){
    createOneQuestionSubmission(
      data: $questionSubmission
    ){
      id
    }
  }
`);
const createQuestionSubmissionDoc = ({
  event,
  session,
  question,
}: {
  event: React.FormEvent<HTMLFormElement>;
  session: Session | null;
  question: Partial<Question>;
}) => {
  //grab uncontrolled inputs here form
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());
  const questionType = question.questionType;
  const {
    selectMultipleSelections,
    shortAnswer,
    multipleChoiceAnswer,
    timeInputType,
    timeTaken,
    totalTimeGiven,
  } = data;
  //we can't save a question submission if there is no session
  if (!session) return;
  const newSubmission: QuestionSubmissionCreateInput = {
    userId: session.user.id,
    questionId: question.id as string,
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
  };
  switch (questionType) {
    case "Multiple Choice":
      newSubmission.answerProvided = [
        {
          id: new ObjectId().toString(),
          value: multipleChoiceAnswer.toString(),
        },
      ];
      break;
    case "Short Answer":
      newSubmission.answerProvided = [
        {
          id: new ObjectId().toString(),
          value: shortAnswer.toString(),
        },
      ];
      break;
    case "Select Multiple":
      try {
        let parsedArr = JSON.parse(
          selectMultipleSelections.toString()
        ) as string[];
        if (!parsedArr) return;
        newSubmission.answerProvided = parsedArr.map((val) => {
          return {
            id: new ObjectId().toString(),
            value: val.toString(),
          };
        });
      } catch (err) {
        console.error(err);
      }
      break;
    default:
      return null;
  }
  return newSubmission;
};
const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  // define hooks
  const session = useSession();
  const params = useParams();
  const questions = useQuestions()[0].data;
  const isSubmitting = useRef<boolean | null>(null);
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  const [mutationQuery, { loading, error, data }] = useMutation(
    UploadNewQuestionSubmissionQuery
  );
  if (!question) return <></>;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //prevent multiple submissions
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    const doc = createQuestionSubmissionDoc({
      session: session.data,
      question,
      event: e,
    });
    if (!doc) return (isSubmitting.current = false);
    try {
      await mutationQuery({
        variables: {
          questionSubmission: doc,
        },
      });
    } catch (err) {
      console.error(err);
    }
    isSubmitting.current = false;
  };
  return (
    <form className="flex flex-col w-full grow h-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
export default QuestionFormWrapper;
