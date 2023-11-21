export const determinePrivateQuery = (value: string) => {
  return value === "All"
    ? null
    : {
        equals: value === "Private",
      };
};
