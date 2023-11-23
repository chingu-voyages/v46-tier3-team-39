export const styles = {
  header: {
    text: [
      "whitespace-nowrap",
      "flex",
      "text-sm",
      "font-medium",
      "odd:bg-gray-100",
      "w-32",
      "justify-center",
      "first:justify-start",
      "last:justify-end",
    ],
    container: [
      "flex",
      "w-full",
      "justify-between",
      "px-0",
      "pb-2",
      "border-Black",
      "border-b",
      "border-solid",
    ],
  },
  listContainer: {
    container: ["flex", "w-full", "flex-col", "px-0"],
    item: {
      container: ["flex", "w-full", "justify-between", "px-0", "py-2"],
      text: [
        "whitespace-nowrap",
        "flex",
        "items-center",
        "font-medium",
        "w-32"
      ],
    },
  },
};
