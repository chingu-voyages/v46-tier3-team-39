import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import QuestionPageContainer from "../components/client/questionPageContainer";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { QuestionTypes } from "@/app/util/types/UserData";
import { gql } from "../../../../../graphql/generated";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
const question: Partial<Question> & {
  id: string;
  questionType: (typeof QuestionTypes)[number];
} = {
  id: "65429fd993f2d4403eac75ec",
  creatorId: "6533f4c7489ef223ffc31a99",
  questionType: "Short Answer",
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
  questionInfo: {
    title: "Question 1",
    description: "Question 2 is the world",
    options: ["the world", "the world", "the world", "the world"],
  },
};
const QuestionQueryById = gql(`
  query GetFullQuestion($id: String) {
    question(where: { id: $id }) {
      id
      creatorId
      questionType
      tags
      questionInfo {
        title
        description
        options
      }
      likeCounter {
        likes
        dislikes
      }
    }
  }
`);
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
  try {
    const session = await getServerSession(options)
    const client = ServerGraphQLClient(session);
    const { data: result } = await client.query(query);
    const data = result.question as (Partial<Question> & { id: string }) | null;
    // console.log(data)
    // const data = question;
    return (
      <NavigationWrapper
        usePadding
        appBars={{
          footer: false,
          navbar: true,
        }}
      >
        <QuestionsContainer initialItems={data ? [data] : []}>
          <QuestionPageContainer />
        </QuestionsContainer>
      </NavigationWrapper>
    );
  } catch (err) {
    console.log(err);
    return <></>;
  }
}
