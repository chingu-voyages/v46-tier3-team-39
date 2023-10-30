const styles = {
    modal: [
        "bg-light-secondary-container",
        "absolute",
        "inset-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "w-11/12",
        "h-[90vh]",
        "py-16",
        "px-5",
        "rounded-5xl",
        "border",
        "border-light-on-secondary-container",
        "outline-none",
        "sm:px-16"
    ].join(" "),
    contentLayout: [
        "overflow-auto",
        "h-[50vh]",
        "sm:h-auto",
        "sm:flex",
        "sm:justify-center"
    ].join(" "),
    h1: [
        "text-5xl",
        "text-center",
        "font-bold",
        "mb-8",
        "whitespace-nowrap"
    ].join(" "),
    closeIcon: [
        "absolute",
        "top-8",
        "right-8",
        "hover:cursor-pointer"
    ].join(" ")
}

export default styles;