"use client";
import React, { useRef } from "react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { gql } from "../../../../../../../graphql/generated";
import { useMutation } from "@apollo/client";
import createQuestionSubmissionDoc from "../utils/createQuestionSubmission";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
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
  const params = useParams();
  const questions = useQuestions()[0].data;
  const isSubmitting = useRef<boolean | null>(null);
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  const [mutationQuery, { loading, error, data }] = useMutation(
    UploadNewQuestionSubmissionQuery
  );
  const currSubmissions = useQuestionSubmissions()[0].ongoingData;
  if (!question) return <></>;
  const submission = currSubmissions[question.id];
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
