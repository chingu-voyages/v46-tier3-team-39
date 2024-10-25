import { Question } from "@/backend/prisma/generated/type-graphql";
import { QuestionsContainer } from "@/frontend/stores/questionStore";
import { getServerSession } from "next-auth";
import { options } from "@/backend/auth/options";
import { Metadata, ResolvingMetadata } from "next";
import { QuestionIdProvider } from "@/frontend/questions/singleQuestion/context/QuestionIdContext";
import { GetFullQuestion } from "@/frontend/gql/queries/questionQueries";
import determineOriginUrl from "@/frontend/parsers/determineOriginUrl";
import ServerGraphQLClient from "@/backend/apollo/ApolloServer";
import QuestionPageContainer from "../../../../../frontend/questions/singleQuestion/questionPageContainer";
import {
  QuestionSubmissionStoreSubmissionType,
  QuestionSubmissionsContainerWrapper,
} from "@/frontend/stores/questionSubmissionsStore";
import { QueryFullQuestionSubmissions } from "@/frontend/gql/queries/questionSubmissionQueries";
import { SortOrder } from "@/backend/gql/generated/graphql";
export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const questionId = params.id;
  const questionQuery = {
    query: GetFullQuestion,
    variables: { id: questionId },
  };
  try {
    const session = await getServerSession(options);
    const client = ServerGraphQLClient(session);
    const questionPromise = client.query(questionQuery);
    const submissionPromise = session
      ? client.query({
          query: QueryFullQuestionSubmissions,
          variables: {
            questionId: { equals: questionId },
            userId: { equals: session.user.id },
            orderBy: { dateCreated: SortOrder.Desc },
          },
        })
      : {
          data: {
            questionSubmissions: null,
          },
        };
    const [{ data: question }, { data: submission }] = await Promise.all([
      questionPromise,
      submissionPromise,
    ]);
    const questionData = question.question as
      | (Partial<Question> & { id: string })
      | null;
    const submissionData =
      submission.questionSubmissions as QuestionSubmissionStoreSubmissionType[];
    if (!questionData?.id) return <></>;
    return (
      <QuestionsContainer initialItems={questionData ? [questionData] : []}>
        <QuestionSubmissionsContainerWrapper
          initialItems={submissionData ? submissionData : []}
          questionId={questionId}
        >
          <QuestionIdProvider questionId={questionData.id}>
            <QuestionPageContainer />
          </QuestionIdProvider>
        </QuestionSubmissionsContainerWrapper>
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
    query: GetFullQuestion,
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
