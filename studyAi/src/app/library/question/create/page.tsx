import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import QuestionCreatePage from "./questionCreatePage";
const createPageContainerClasses = [
  "flex",
  "items-center",
  "justify-center",
  "grow",
  "h-full",
  "bg-White",
  "w-full",
  "px-[5%]",
  "py-[calc(max(4%,2rem))]",
];
const CreatePage = () => {
  return (
    <NavigationWrapper
      appBars={{
        footer: false,
        navbar: true,
      }}
      usePadding={false}
    >
      <div className={createPageContainerClasses.join(" ")}>
        <QuestionCreatePage />
      </div>
    </NavigationWrapper>
  );
};
export default CreatePage;
