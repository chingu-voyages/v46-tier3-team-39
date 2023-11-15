import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper"
import styles from "./styles"
import QuestionList from "./components/client/questionList"
import { QueryUserGeneratedQuestions } from "@/app/dashboard/server/greetingBannerContainer"
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import type { Question } from "@prisma/client"
import { QuestionsContainer } from "@/app/stores/questionStore"

export default async function QuestionLibrary() {
    const session = await getServerSession(options);
    const client = ServerGraphQLClient(session);
    try {
        const userId = session?.user.id;
        const query = {
            query: QueryUserGeneratedQuestions,
            variables: {userId: userId}
        }
        const {data: result} = await client.query(query);
        const data = result.questions as (Partial<Question> & {id: string})[];
        console.log(data);
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
                            <QuestionList />
                        </QuestionsContainer>
                    </div>    
            </NavigationWrapper>
        )
    }
    catch(error) {
        console.error(error)
        return <></>
    }
    
    

}
