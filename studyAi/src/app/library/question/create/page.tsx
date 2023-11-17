import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import QuestionCreatePage from "./questionCreatePage";
const CreatePage = () => {
  return (
    <NavigationWrapper
      appBars={{
        footer: false,
        navbar: true,
      }}
      usePadding={false}
    >
      <div className="flex items-center justify-center grow h-full bg-White">
        <QuestionCreatePage />
      </div>
    </NavigationWrapper>
  );
};
export default CreatePage;
