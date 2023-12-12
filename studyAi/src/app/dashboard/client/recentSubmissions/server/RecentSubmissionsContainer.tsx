import { getServerSession } from "next-auth";
import { RecentQuestionSubmissionsContainerWrapper } from "@/app/stores/recentSubmissionsStore";
import { options } from "@/authComponents/nextAuth/options";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import { QueryFullQuestionSubmissions } from "@/gql/queries/questionSubmissionQueries";
import { QuestionSubmission } from "@prisma/client";
const RecentSubmissionsContainer = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    const session = await getServerSession(options);
    if (!session) return <></>;
    const client = ServerGraphQLClient(session);
    const query = {
      query: QueryFullQuestionSubmissions,
      variables: {
        userId: session.user.id,
      },
    };
    const { data } = await client.query(query);
    const questionSubmissions =
      data.questionSubmissions as (Partial<QuestionSubmission> & {
        id: string;
      })[];
    return (
      <RecentQuestionSubmissionsContainerWrapper
        initialItems={questionSubmissions}
      >
        {children}
      </RecentQuestionSubmissionsContainerWrapper>
    );
  } catch (err) {
    console.error(err);
    return <></>;
  }
};
export default RecentSubmissionsContainer;
