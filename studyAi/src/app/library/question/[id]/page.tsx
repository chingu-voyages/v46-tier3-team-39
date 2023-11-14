import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import QuestionPageContainer from "../components/page/client/questionPageContainer";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { QuestionTypes } from "@/app/util/types/UserData";
import { gql } from "../../../../../graphql/generated";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Metadata, ResolvingMetadata } from "next";
import determineOriginUrl from "@/app/util/parsers/determineOriginUrl";
const question: Partial<Question> & {
  id: string;
  questionType: (typeof QuestionTypes)[number];
} = {
  id: "6533f4c8489ef223ffc31a9b",
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
    options: [
      {
        id: "1",
        value: "Option 1",
      },
      {
        id: "2",
        value: "Option 1",
      },
    ],
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
        options {
          id
          value
        }
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
    // const session = await getServerSession(options)
    // const client = ServerGraphQLClient(session);
    // const { data: result } = await client.query(query);
    // const data = result.question as (Partial<Question> & { id: string }) | null;
    // console.log(data)
    const data = question;
    return (
      <QuestionsContainer initialItems={data ? [data] : []}>
        <QuestionPageContainer />
      </QuestionsContainer>
    );
  } catch (err) {
    console.error(err);
    return <></>;
  }
}
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const questionId = params.id;
  const query = {
    query: QuestionQueryById,
    variables: { id: questionId },
  };
  const session = await getServerSession(options);
  const client = ServerGraphQLClient(session);
  const { data: result } = await client.query(query);
  const data = result.question as (Partial<Question> & { id: string }) | null;
  const title = data?.questionInfo?.title
    ? `${data.questionInfo.title} - Study AI`
    : "Question title is not found - Study AI";
  const description =
    data?.questionInfo?.description ?? "Question description is not available";
  const origin = determineOriginUrl() as string;
  return {
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      locale: "en_US",
      type: "website",
      siteName: "Study AI",
      url: origin,
      images: [
        {
          url: "/logo/logo.png",
          width: 800,
          height: 800,
        },
      ],
    },
  };
}
