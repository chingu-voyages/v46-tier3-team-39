import NavigationWrapper from "../../../../../frontend/utils/components/navigation/navigationWrapper";
import QuestionCreatePage from "../../../../../frontend/questions/singleQuestion/questionCreatePage";
import { protectRouteSSR } from "@/backend/auth/helpers/sessionFuncs";
import { generateMetadataProps } from "../../../../../frontend/metadata/generateMetadataProps";
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
const CreatePage = async () => {
  //protect current route
  const sessionData = await protectRouteSSR("/auth/login");
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
export const generateMetadata = generateMetadataProps({
  title: "Create Question - Study AI",
  description: "Create a novel question!",
});
export default CreatePage;
