import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import styles from "../questionListComponents/styles";
import QuestionList from "../questionListComponents/client/questionList";
import { QueryUserGeneratedQuestions } from "@/app/dashboard/server/greetingBannerContainer";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import type { Question } from "@prisma/client";
import { QuestionsContainer } from "@/app/stores/questionStore";
import { protectRouteSSR } from "@/app/api/utils/sessionFuncs";
import gql from "graphql-tag";

const QueryPublicQuestions = gql(`
  query FindManyQuestionResolver(
    $private: String
    $dateQuery: DateTimeFilter
  ) {
    questions(
      where: {
        private: { equals: $private }
        dateCreated: $dateQuery
      }
      orderBy: { dateCreated: desc }
    ) {
      id
      questionType
      tags
      questionInfo{
        title
      }
      private
    }
  }
`);

export default async function QuestionLibrary() {
  const sessionData = await protectRouteSSR("/auth/login");
  const session = sessionData.props.session;
  const client = ServerGraphQLClient(session);
  try {
    const userId = session?.user.id;
    const query = {
      query: QueryUserGeneratedQuestions,
      variables: { userId: userId },
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
            <QuestionList allPublicQuestions={true}/>
          </QuestionsContainer>
        </div>
      </NavigationWrapper>
    );
  } catch (error) {
    console.error(error);
    return <></>;
  }
}