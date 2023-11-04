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
        "overflow-y-auto",
        "h-[70%]",
        "max-w-[975px]",
        "mx-auto",
        "lg:flex",
        "lg:justify-center"
    ].join(" "),
    h1: [
        "text-5xl",
        "text-center",
        "font-bold",
        "mb-2",
        "whitespace-nowrap",
        "sm:mb-4"
    ].join(" "),
    closeIcon: [
        "absolute",
        "top-8",
        "right-8",
        "hover:cursor-pointer",
        "text-lg",
        "sm:text-2xl"
    ].join(" ")
}

export default styles;