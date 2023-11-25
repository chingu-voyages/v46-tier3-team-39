import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { protectRouteSSR } from "@/app/api/utils/sessionFuncs";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import { generateMetadataProps } from "@/app/util/metadata/generateMetadataProps";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { ResolvingMetadata } from "next";
import {
  QuestionSubmissionStoreSubmissionType,
  QuestionSubmissionsContainerWrapper,
} from "@/app/stores/questionSubmissionsStore";
import QuestionSubmissionsPageList from "../components/client/QuestionSubmissionPageList";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const generateMetadata = (
  { params }: Props,
  parent: ResolvingMetadata
) => {
  return generateMetadataProps({
    title: `Your Submissions - Study AI`,
    description: `A record of your question and quiz submissions`,
  });
};
const QuestionsSubmissionsPage = async () => {
  const session = await protectRouteSSR("/auth/login");
  if (!session) return null;
  const client = ServerGraphQLClient(session.props.session);
  const userId = session.props.session.user.id;
  const { data } = await client.query({
    query: QueryFullQuestionSubmissions,
    variables: {
      userId,
    },
  });
  const currData =
    (data &&
      (data.questionSubmissions as QuestionSubmissionStoreSubmissionType[])) ||
    ([] as QuestionSubmissionStoreSubmissionType[]);
  return (
    <NavigationWrapper
      appBars={{
        footer: true,
        navbar: true,
      }}
    >
      <QuestionSubmissionsContainerWrapper initialItems={currData}>
        <QuestionSubmissionsPageList />
      </QuestionSubmissionsContainerWrapper>
    </NavigationWrapper>
  );
};
export default QuestionsSubmissionsPage;
