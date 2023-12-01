import { Question } from "../../../../../prisma/generated/type-graphql";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { getServerSession } from "next-auth";
import { options } from "@/authComponents/nextAuth/options";
import { Metadata, ResolvingMetadata } from "next";
import { QuestionIdProvider } from "../context/QuestionIdContext";
import { GetFullQuestion } from "@/gql/queries/questionQueries";
import determineOriginUrl from "@/app/util/parsers/determineOriginUrl";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import QuestionPageContainer from "../components/page/client/questionPageContainer";
import { QuestionSubmissionStoreSubmissionType, QuestionSubmissionsContainerWrapper } from "@/app/stores/questionSubmissionsStore";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { SortOrder } from "../../../../../graphql/generated/graphql";
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
            userId: session.user.id,
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
