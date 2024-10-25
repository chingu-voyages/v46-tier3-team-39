import NavigationWrapper from "../../../../../frontend/utils/components/navigation/navigationWrapper";
import styles from "../../../../../frontend/questions/questionList/styles";
import QuestionsLibraryContainer from "../../../../../frontend/questions/questionLibrary/questionLibraryContainer";
import ServerGraphQLClient from "../../../../../backend/apollo/ApolloServer";
import type { Question } from "@prisma/client";
import { QuestionsContainer } from "../../../../../frontend/stores/questionStore";
import { protectRouteSSR } from "@/backend/auth/helpers/sessionFuncs";
import { GetQuestionsInfo } from "../../../../../frontend/gql/queries/questionQueries";
import { SortOrder } from "../../../../../backend/gql/generated/graphql";
import { questions } from "@/prisma/seed/seedData";
export default async function QuestionLibrary() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const client = ServerGraphQLClient(session);
  try {
    const userId = session?.user.id || "";
    // const query = {
    //   query: GetQuestionsInfo,
    //   variables: {
    //     creatorId: { equals: userId },
    //     orderBy: {
    //       dateCreated: "desc" as SortOrder,
    //     },
    //   },
    // };
    // const { data: result } = await client.query(query);
    const result = {
      questions,
    };
    const data = result.questions as (Partial<Question> & { id: string })[];
    return (
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      >
        <div className={styles.layout}>
          <h1 className={styles.h1}>My Question Library</h1>
          <QuestionsContainer initialItems={data}>
            <QuestionsLibraryContainer pageType="user" />
          </QuestionsContainer>
        </div>
      </NavigationWrapper>
    );
  } catch (error) {
    console.error(error);
    return <></>;
  }
}
