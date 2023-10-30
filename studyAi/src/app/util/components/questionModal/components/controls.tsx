const Controls = () => {

    const styles = {
        layout: [
            "flex",
            "justify-between",
            "w-[600px]",
            "mx-auto",
            "mt-8"
        ].join(" "),
        button: ({isCancel = false}) =>[
            "p-3",
            "text-White",
            "text-3xl",
            "rounded-2xl",
            isCancel ? "bg-light-error" : "bg-light-on-secondary-container",
        ].join(" ")
    }
    return (
        <div className={styles.layout}>
            <button className={styles.button({})}>Upload Question</button>
            <button className={styles.button({})}>Generate With Ai</button>
            <button className={styles.button({isCancel: true})}>Cancel</button>
        </div>
    )
}

export default Controls