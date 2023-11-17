import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import QuestionCreatePage from "./questionCreatePage";
import { Metadata } from "next";
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
export async function generateMetadata(): Promise<Metadata> {
  const title = "Create Question - Study AI";
  const description = "Create a novel question!";
  return {
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      locale: "en_US",
      type: "website",
      siteName: "Study AI",
      url: origin,
      images: [
        {
          url: "/logo/logo.png",
          width: 800,
          height: 800,
        },
      ],
    },
  };
}
export default CreatePage;
