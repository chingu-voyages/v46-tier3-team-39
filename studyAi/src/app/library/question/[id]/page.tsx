import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import NavigationBtns from "../components/client/navigationBtns";
import QuestionContainer from "../components/server/questionContainer";
import AnswerContainer from "../components/server/answerContainer";
import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { gql } from "@apollo/client";
import { Question } from "../../../../../prisma/generated/type-graphql";
const QuestionQueryById = gql`
  query Question($id: String) {
    question(where: { id: $id }) {
      id
      questionType
    }
  }
`;
export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const questionId = params.id;
  const query = {
    query: QuestionQueryById,
    variables: { id: questionId },
    
  };
  const { data: result } = await ServerGraphQLClient.query(query);
  const data = result as Partial<Question> | null;
  return (
    <NavigationWrapper
      usePadding
      appBars={{
        footer: true,
        navbar: true,
      }}
    >
      <NavigationBtns />
      <div className="flex w-full justify-between">
        <QuestionContainer data={data ? data : undefined} />
        <AnswerContainer data={data ? data : undefined} />
      </div>
      <h1>Question Page</h1>
    </NavigationWrapper>
  );
}
