"use client";
import { useQuery } from "@apollo/client";
import { Question } from "../../../../../../../prisma/generated/type-graphql";
import { useQuestions } from "@/app/stores/questionStore";
import { Container } from "../../page/server/containerBar";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { GetQuestionAnswerById } from "@/gql/queries/questionQueries";
const SolutionView = () => {
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(GetQuestionAnswerById, {
    variables: { id: questionId },
  });
  const answerData = queryData as
    | undefined
    | { question: Partial<Question> | null };
  const question = questions.map[questionId ? questionId : ""];
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question?.answer?.correctAnswer.map((e) => {
        return e.value;
      })}
    </Container>
  );
};
export default SolutionView;
