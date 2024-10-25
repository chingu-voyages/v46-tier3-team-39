const styles = {
    layout: [
        "py-16",
        "px-5",
        "sm:py-24",
        "sm:px-16"
    ].join(" "),
    h1: [
        "text-3xl",
        "font-bold",
        "sm:text-5xl"
    ].join(" "),
}
export const listStyles = {
  layout: [
    "flex",
    "items-center",
    "justify-between",
    "p-4",
    "border-b",
    "border-[#5C5F60]",
    "sm:px-16",
  ].join(" "),
  h3: ["text-xl", "mb-2"].join(" "),
  h4: ["text-lg", "text-[#5C5F60]"].join(" "),
  tag: ["p-1", "bg-[#CDCDCD]", "mx-2", "rounded-full", "mt-4"].join(" "),
  paginateContainer: ["flex", "justify-between", "p-4", "w-[400px]"].join(" "),
};
export default styles