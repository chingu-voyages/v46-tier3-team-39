"use client";
import { Container } from "../../page/server/containerBar";
import QuestionSubmissionsList from "../../submissions/QuestionSubmissionsList";
export const SubmissionView = () => {
  return (
    <Container overflow className="px-[5%] py-5 grow">
      <QuestionSubmissionsList layout="tabbed"/>
    </Container>
  );
};
