import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { protectRouteSSR } from "@/app/api/utils/sessionFuncs";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import { generateMetadataProps } from "@/app/util/metadata/generateMetadataProps";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import QuestionSubmissionsPageList from "../components/client/QuestionSubmissionPageList";
import {
  QuestionSubmissionStoreSubmissionAnyParentType,
  QuestionSubmissionsAnyQuestionContainerWrapper,
} from "@/app/stores/questionSubmissionsStoreAnyQuestion";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const generateMetadata = () => {
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
      (data.questionSubmissions as QuestionSubmissionStoreSubmissionAnyParentType[])) ||
    ([] as QuestionSubmissionStoreSubmissionAnyParentType[]);
  return (
    <NavigationWrapper
      appBars={{
        footer: true,
        navbar: true,
      }}
    >
      <QuestionSubmissionsAnyQuestionContainerWrapper initialItems={currData}>
        <QuestionSubmissionsPageList />
      </QuestionSubmissionsAnyQuestionContainerWrapper>
    </NavigationWrapper>
  );
};
export default QuestionsSubmissionsPage;
