"use client";
import { useQuery } from "@apollo/client";
import { Question } from "../../../../../../../prisma/generated/type-graphql";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import { Container } from "../../page/server/containerBar";
import { gql } from "../../../../../../../graphql/generated";
const getAnswerById = gql(`
  query GetAnswerById($id: String) {
    question(where: { id: $id }) {
      id
      answer {
        correctAnswer {
          id
          value
        }
      }
    }
  }
`);
const SolutionView = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const questionId = params
    ? typeof params.id === "string"
      ? params.id
      : params.id[0]
    : "";
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(getAnswerById, {
    variables: { id: questionId },
  });
  const answerData = queryData as
    | undefined
    | { question: Partial<Question> | null };
  const question = questions.map[questionId];
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question?.answer?.correctAnswer.map((e) => {
        return e.value;
      })}
    </Container>
  );
};
export default SolutionView;
