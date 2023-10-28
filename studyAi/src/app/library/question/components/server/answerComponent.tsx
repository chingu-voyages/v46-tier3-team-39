"use client";
import { useQuery } from "@apollo/client";
import { Question } from "../../../../../../prisma/generated/type-graphql";
import { gql } from "@apollo/client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
const getAnswerById = gql`
  query Question($id: String) {
    question(where: { id: $id }) {
      id
      answer {
        answer
      }
    }
  }
`;
const AnswerContainer = ({ height }: { height?: string | number }) => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const questionId = params?.id as string | undefined;
  if (!questionId) return <></>;
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getAnswerById, {
    variables: { id: questionId },
  });
  const answerData = queryData as undefined | { question: Partial<Question> | null };
  const question = questions[questionId];
  console.log(loading, question, answerData);
  return <></>;
};
export default AnswerContainer;
