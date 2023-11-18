"use client";
import React, { useRef } from "react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { gql } from "../../../../../../../graphql/generated";
import { useMutation } from "@apollo/client";
import createQuestionSubmissionDoc from "../utils/createQuestionSubmission";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import { useQuestionId } from "../../../context/QuestionIdContext";
const UploadNewQuestionSubmissionQuery = gql(`
  mutation UploadNewQuestionSubmission($questionSubmission: QuestionSubmissionCreateInput!){
    createOneQuestionSubmission(
      data: $questionSubmission
    ){
      id
    }
  }
`);
const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  // define hooks
  const session = useSession();
  const questions = useQuestions()[0].data;
  const isSubmitting = useRef<boolean | null>(null);
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const [mutationQuery, { loading, error, data }] = useMutation(
    UploadNewQuestionSubmissionQuery
  );
  const [currSubmissions, { deleteItems }] = useQuestionSubmissions();
  if (!question) return <></>;
  const submission = currSubmissions.ongoingData[question.id];
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //prevent multiple submissions
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    const doc = createQuestionSubmissionDoc({
      session: session.data,
      event: e,
      submission,
    });
    if (!doc) return (isSubmitting.current = false);
    try {
      await mutationQuery({
        variables: {
          questionSubmission: doc,
        },
      });
      deleteItems([
        {
          questionId: question.id,
        },
      ]);
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
