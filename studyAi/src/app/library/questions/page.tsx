import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import styles from "../../util/components/questionList/server/styles";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import type { Question } from "@prisma/client";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { protectRouteSSR } from "@/app/api/utils/sessionFuncs";
import { GetQuestionsInfo } from "@/gql/queries/questionQueries";
import { SortOrder } from "@/gql/generated/graphql";
import QuestionsLibraryContainer from "../questionLibrary/questionLibraryContainer";
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
