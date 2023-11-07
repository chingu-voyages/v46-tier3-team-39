const styles = {
    modal: [
        "w-full",
        "h-full",
        "py-16",
        "px-5",
        "rounded-5xl",
        "border",
        "border-light-on-secondary-container",
        "bg-light-secondary-container",
        "overflow-y-auto",
        "sm:px-16"
    ].join(" "),
    contentLayout: [
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