import { createContext, useContext } from "react";
const SubmissionListContext = createContext({
  layout: "page",
});
const useSubmissionListContext = () => useContext(SubmissionListContext);
const SubmissionListProvider = ({
  children,
  layout,
}: {
  layout: "page" | "tabbed";
  children: React.ReactNode;
}) => {
  return (
    <SubmissionListContext.Provider
      value={{
        layout,
      }}
    >
      {children}
    </SubmissionListContext.Provider>
  );
};
export { SubmissionListProvider, useSubmissionListContext };
