import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import NavigationBtns from "../components/client/navigationBtns";

import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { gql } from "@apollo/client";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { QuestionView } from "../components/client/QuestionView";
const QuestionQueryById = gql`
  query Question($id: String) {
    question(where: { id: $id }) {
      id
      creatorId
      questionType
      tags
      question {
        title
        description
      }
      # answer {
      #   answer
      # }
      # dateCreated
      likeCounter {
        likes
        dislikes
      }
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
  const data = result.question as (Partial<Question> & { id: string }) | null;
  return (
    <NavigationWrapper
      usePadding
      appBars={{
        footer: true,
        navbar: true,
      }}
    >
      <QuestionsContainer initialItems={data ? [data] : []}>
        <NavigationBtns />
        <QuestionView />
      </QuestionsContainer>
    </NavigationWrapper>
  );
}
