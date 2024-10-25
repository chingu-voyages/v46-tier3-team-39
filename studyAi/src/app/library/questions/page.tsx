import NavigationWrapper from "../../../../frontend/utils/components/navigation/navigationWrapper";
import styles from "../../../../frontend/questions/questionList/styles";
import ServerGraphQLClient from "../../../../backend/apollo/ApolloServer";
import type { Question } from "@prisma/client";
import { QuestionsContainer } from "../../../../frontend/stores/questionStore";
import { protectRouteSSR } from "@/backend/auth/helpers/sessionFuncs";
import { GetQuestionsInfo } from "../../../../frontend/gql/queries/questionQueries";
import { SortOrder } from "../../../../backend/gql/generated/graphql";
import QuestionsLibraryContainer from "../../../../frontend/questions/questionLibrary/questionLibraryContainer";
export default async function QuestionLibrary() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const client = ServerGraphQLClient(session);
  try {
    //Grabs all public questions
    const query = {
      query: GetQuestionsInfo,
      variables: {
        creatorId: { equals: session?.user.id || "" },
        orderBy: {
          dateCreated: "desc" as SortOrder,
        },
        private: { equals: false },
      },
    };
    const { data: result } = await client.query(query);
    const data = result.questions as (Partial<Question> & { id: string })[];
    return (
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      >
        <div className={styles.layout}>
          <h1 className={styles.h1}>Question Library</h1>
          <QuestionsContainer initialItems={data}>
            <QuestionsLibraryContainer pageType="public" />
          </QuestionsContainer>
        </div>
      </NavigationWrapper>
    );
  } catch (error) {
    console.error(error);
    return <></>;
  }
}
