"use client";
import { Container } from "../../utils/components/containerBar/containerBar";
import QuestionSubmissionsList from "../submissionList/QuestionSubmissionsList";
import { v4 as uuid } from "uuid";
//will be used to identify the scrollable target container
//for infinite scroll
const containerId = uuid();
export const SubmissionView = () => {
  return (
    <Container id={containerId} overflow className="px-[5%] py-5 grow">
      <QuestionSubmissionsList containerId={containerId} />
    </Container>
  );
};
