export const determinePrivateQuery = (value: string) => {
  return value === "All"
    ? undefined
    : {
        equals: value === "Private",
      };
};
