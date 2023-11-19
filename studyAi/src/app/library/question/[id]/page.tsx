import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import QuestionPageContainer from "../components/page/client/questionPageContainer";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { gql } from "../../../../../graphql/generated";
import { getServerSession } from "next-auth";
import { options } from "@/authComponents/nextAuth/options";
import { Metadata, ResolvingMetadata } from "next";
import determineOriginUrl from "@/app/util/parsers/determineOriginUrl";
import { QuestionIdProvider } from "../context/QuestionIdContext";
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
    const session = await getServerSession(options);
    const client = ServerGraphQLClient(session);
    const { data: result } = await client.query(query);
    const data = result.question as (Partial<Question> & { id: string }) | null;
    if (!data?.id) return <></>;
    return (
      <QuestionsContainer initialItems={data ? [data] : []}>
        <QuestionIdProvider questionId={data.id}>
          <QuestionPageContainer />
        </QuestionIdProvider>
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
