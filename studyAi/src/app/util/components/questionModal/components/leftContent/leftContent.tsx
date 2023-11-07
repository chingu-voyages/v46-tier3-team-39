import TimeFormatDropdown from "./timeFormat"
import styles from "./leftContentStyles"
import type { Question } from "../../../../../../../prisma/generated/type-graphql"
import CreatableSelect from 'react-select/creatable';

const LeftContent = ({questionData} : {questionData?: Partial<Question>}) => {

    // need to update tagOptions with actaul options from DB
    const tagOptions = [
        {value: "science", label: "science"},
        {value: "math", label: "math"}
    ]

    const tagsDefault = questionData?.tags ? questionData?.tags.map((tag) => {
        return {
            value: tag, 
            label: tag
        }
    }) : undefined

    return (
        <div className={styles.layout}>
            <form>
                <div>
                    <label htmlFor="title" className={styles.label}>Question Title</label>
                    <input id="title" className={styles.input({})} defaultValue={questionData?.questionInfo?.title} />
                </div>
                <div className={styles.estTimeLayout}>
                    <label htmlFor="time" className={styles.label}>Est. Time</label>
                    <input id="time" className={styles.input({isTime: true})} />
                    <TimeFormatDropdown />
                </div>
                <div>
                    <label htmlFor="tags" className={styles.label}>Tags</label>
                    <CreatableSelect id="tags" className={styles.input({})} options={tagOptions} defaultValue={tagsDefault} isMulti/>
                </div>
                <div>
                    <label htmlFor="description" className={styles.label}>Question Description</label>
                    <textarea id="description" className={styles.input({isTextArea: true})} defaultValue={questionData?.questionInfo?.description} />
                </div>
            </form>
        </div>
    )
}

export default LeftContent