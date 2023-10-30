const styles = {
    layout: [
        "mx-auto",
        "w-full",
        "relative",
        "text-center",
        "sm:mr-8"
    ].join(" "),
    label: [
        "block",
        "mb-2",
        "text-3xl",
        "font-semibold",
        "text-Black",
        "sm:text-5xl"
    ].join(" "),
    input: ({isTime = false, isTextArea = false}) => [
        "bg-White",
        "border",
        "border-light-on-secondary-container",
        "text-Black",
        "text-sm",
        "rounded-lg",
        "focus:ring-blue-500",
        "focus:border-blue-500",
        "block",
        isTime ? "w-8" : "w-full",
        isTime ? "p-1" : "p-2.5",
        isTime ? "my-auto ml-4 h-8" : "",
        isTextArea ? "h-[215px] max-h-[215px]" : ""

    ].join(" "),
    estTimeLayout: [
        "flex",
        "justify-center",
        "sm:absolute",
        "sm:top-0",
        "sm:right-0",
    ].join(" "),

}

export default styles;