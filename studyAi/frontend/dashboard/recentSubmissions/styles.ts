const styles = {
  header: {
    container: ["flex", "flex-col", "px-0"],
    text: ["text-lg", "font-semibold", "tracking-normal"],
    subHeader: {
      container: ["flex", "justify-between", "py-2", "border-b"],
      text: [
        "flex",
        "text-xs",
        "font-normal",
        // "text-center",
        // "last:text-right",
        // "first:text-left",
        "justify-center",
        "last:justify-end",
        "first:justify-start",
      ],
    },
  },
  listContainer: {
    container: ["px-0", "flex", "flex-col", ""],
  },
  listItem: {
    container: [
      "flex",
      "justify-between",
      "border-b",
      "last:border-b-0",
    ],
    columnItem: [
      "flex",
      "px-0",
      "mx-0",
    ],
  },
};
export default styles;
