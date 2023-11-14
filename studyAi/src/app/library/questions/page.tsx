import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper"
import styles from "./styles"
import QuestionList from "./components/client/questionList"

export default function QuestionLibrary() {
    const questions = Array(8).fill({questionInfo: {title: "Question Title", description: "", options: []}, tags: ["science", "math", "history"], questionType:"Short Answer", id:"1"})
    return (
        <NavigationWrapper
            appBars={{
                navbar: true,
                footer: true,
            }}
        >
            <div className={styles.layout}>
                <h1 className={styles.h1}>My Question Library</h1>
                <QuestionList questions={questions}/>
            </div>
        </NavigationWrapper>
    )

}

