const Controls = () => {

    const styles = {
        layout: [
            "mx-auto",
            "mt-4",
            "sm:flex",
            "sm:items-center",
            "sm:w-[640px]",
            "sm:absolute",
            "sm:bottom-[10%]",
            "sm:left-1/2",
            "sm:-translate-x-1/2"
        ].join(" "),
        topButtonsLayout: [
            "flex",
            "justify-between",
            "w-11/12",
            "mx-auto",
            "max-w-[400px]",
            "sm:w-[400px]"
        ].join(" "),
        button: ({isCancel = false}) =>[
            "p-3",
            "h-fit",
            "block",
            "text-White",
            "text-sm",
            "rounded-2xl",
            "whitespace-nowrap",
            isCancel ? "bg-light-error" : "bg-light-on-secondary-container",
            isCancel ? "mx-auto my-4" : "",
            "sm:text-lg",
        ].join(" ")
    }
    return (
        <div className={styles.layout}>
            <div className={styles.topButtonsLayout}>
                <button className={styles.button({})}>Upload Question</button>
                <button className={styles.button({})}>Generate With Ai</button>
            </div>
            <button className={styles.button({isCancel: true})}>Cancel</button>
        </div>
    )
}

export default Controls