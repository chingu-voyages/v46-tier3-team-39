"use client";
import { BsStars } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import Link from "next/link";
import { useDashBoard } from "../context/DashboardContext";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import ConditionalWrapper from "@/app/util/components/conditionalWrapper/conditionalWrapper";
import GreetingBanner from "./greetingBanner";

const GreetingBannerCard = ({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  link: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={link}
      className="border flex flex-col min-h-[10rem] items-center justify-center p-6"
    >
      <div className="flex items-center w-full">
        <div className="">{icon}</div>
        <div className="font-bold text-lg ml-2">{title}</div>
      </div>
      <div className="pt-2 text-sm">{description}</div>
    </Link>
  );
};
const GreetingBannerWrapper = () => {
  const dashboardContext = useDashBoard();
  const windowWidth = useWindowWidth();
  if (!dashboardContext) return <></>;
  const { profileData } = dashboardContext;

  return (
    <ConditionalWrapper
      condition={windowWidth > 768}
      wrapper={(children) => (
        <div className="flex flex-col w-full space-y-6">{children}</div>
      )}
    >
      <GreetingBanner />
      <div className="flex flex-col justify-between item-center space-y-5 xs:space-y-0 xs:space-x-5 md:space-x-6 xs:flex-row">
        <GreetingBannerCard
          icon={<BsStars className={"text-2xl"} />}
          title="Create Questions"
          description="Create exam questions using AI! Use another community question as a template, or upload your own!"
          link={`/library/question/create`}
        />
        <GreetingBannerCard
          icon={<FaFileCircleQuestion className={"text-2xl"} />}
          title="Your Questions"
          description="Choose exams from our community, or create your own variations using any questions you generate or find!"
          link={`/library/${profileData.id}/questions`}
        />
      </div>
    </ConditionalWrapper>
  );
};

export default GreetingBannerWrapper;
