import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper"
import styles from "./styles"
import QuestionList from "./components/client/questionList"

export default function QuestionLibrary() {
    return (
        <NavigationWrapper
            appBars={{
                navbar: true,
                footer: true,
            }}
        >
            <div className={styles.layout}>
                <h1 className={styles.h1}>My Question Library</h1>
                <QuestionList questions={[{questionInfo: {title: "Question Title", description: "", options: []}, tags: ["science", "math", "history"], questionType:"Short Answer"}]}/>
            </div>
        </NavigationWrapper>
    )

}

