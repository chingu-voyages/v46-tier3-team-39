import TimeFormatDropdown from "./timeFormat"
import styles from "./leftContentStyles"

const LeftContent = () => {

    return (
        <div className={styles.layout}>
            <form>
                <div>
                    <label htmlFor="title" className={styles.label}>Question Title</label>
                    <input id="title" className={styles.input({})} />
                </div>
                <div className={styles.estTimeLayout}>
                    <label htmlFor="time" className={styles.label}>Est. Time</label>
                    <input id="time" className={styles.input({isTime: true})} />
                    <TimeFormatDropdown />
                </div>
                <div>
                    <label htmlFor="tags" className={styles.label}>Tags</label>
                    <input id="tags" className={styles.input({})} />
                </div>
                <div>
                    <label htmlFor="description" className={styles.label}>Question Description</label>
                    <textarea id="description" className={styles.input({isTextArea: true})} />
                </div>
            </form>
        </div>
    )
}

export default LeftContent