"use client";
import { useQuery } from "@apollo/client";
import { Question } from "../../../../../../../prisma/generated/type-graphql";
import { useQuestions } from "@/app/stores/questionStore";
import { Container } from "../../page/server/containerBar";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { GetQuestionAnswerById } from "@/gql/queries/questionQueries";
import { useEffect } from "react";
const SolutionView = () => {
  const [questionsData, { addOrUpdateItems }] = useQuestions();
  const questions = questionsData.data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const {
    loading,
    error,
    data: queryData,
  } = useQuery(GetQuestionAnswerById, {
    variables: { id: questionId },
  });
  useEffect(() => {
    const currData = queryData?.question;
    if (!currData || !questionId) return;
    addOrUpdateItems([
      {
        ...currData,
        id: questionId,
      },
    ]);
  }, [queryData, addOrUpdateItems, questionId]);
  const question = questions.map[questionId ? questionId : ""];
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question?.answer?.correctAnswer
        .map((e) => {
          return e.value;
        })
        .join(", ")}
    </Container>
  );
};
export default SolutionView;
