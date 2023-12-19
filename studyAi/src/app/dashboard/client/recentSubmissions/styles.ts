const styles = {
  header: {
    container: ["flex", "flex-col", "px-0"],
    text: ["text-lg", "font-semibold", "tracking-normal"],
    subHeader: {
      container: ["flex", "justify-between", "py-2", 'border-b'],
      text: [
        "text-xs",
        "font-normal",
        "text-center",
        "last:text-right",
        "first:text-left",
      ],
    },
  },
  listContainer: {
    container: ["px-0", 'flex', 'flex-col', ''],
  },
};
export default styles;
