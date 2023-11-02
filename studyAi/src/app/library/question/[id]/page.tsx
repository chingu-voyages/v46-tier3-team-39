import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import NavigationBtns from "../components/client/navigationBtns";
import ServerGraphQLClient from "@/app/api/graphql/apolloClient";
import { gql } from "@apollo/client";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { QuestionTypes } from "@/app/util/types/UserData";
import { QuestionWrapper } from "../components/client/questionWrapper";
const question: Partial<Question> & {
  id: string;
  questionType: (typeof QuestionTypes)[number];
} = {
  id: "653ad11c215e46561c12e643",
  creatorId: "6533f4c7489ef223ffc31a99",
  questionType: "multipleChoice",
  tags: [
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
  ],
  likeCounter: {
    likes: 1500000000,
    dislikes: 100000,
  },
  question: {
    title: "Question 1",
    description: "Question 2 is the world",
    options: []
  },
};
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
  // const data = result.question as (Partial<Question> & { id: string }) | null;
  const data = question;
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
        <QuestionWrapper />
      </QuestionsContainer>
    </NavigationWrapper>
  );
}
