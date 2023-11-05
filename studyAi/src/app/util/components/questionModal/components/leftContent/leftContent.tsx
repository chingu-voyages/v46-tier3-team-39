import TimeFormatDropdown from "./timeFormat"
import styles from "./leftContentStyles"
import type { Question } from "../../../../../../../prisma/generated/type-graphql"
import { useState } from "react"

const LeftContent = ({questionData} : {questionData?: Partial<Question>}) => {

    let titlePlaceholder = undefined;
    let currentTags: string[] = [];
    
    if (questionData) {
        if (questionData.question) {
            titlePlaceholder = questionData.question.title
        }
        if (questionData.tags) {
            currentTags = questionData.tags
        }
    }
    const [tags, setTags] = useState<string[]>(currentTags);
    
    return (
        <div className={styles.layout}>
            <form>
                <div>
                    <label htmlFor="title" className={styles.label}>Question Title</label>
                    <input id="title" className={styles.input({})} value={questionData?.question?.title} />
                </div>
                <div className={styles.estTimeLayout}>
                    <label htmlFor="time" className={styles.label}>Est. Time</label>
                    <input id="time" className={styles.input({isTime: true})} />
                    <TimeFormatDropdown />
                </div>
                <div>
                    <label htmlFor="tags" className={styles.label}>Tags</label>
                    <input id="tags" className={styles.input({})} value={questionData?.tags} />
                </div>
                <div>
                    <label htmlFor="description" className={styles.label}>Question Description</label>
                    <textarea id="description" className={styles.input({isTextArea: true})} value={questionData?.question?.description} />
                </div>
            </form>
        </div>
    )
}

export default LeftContent