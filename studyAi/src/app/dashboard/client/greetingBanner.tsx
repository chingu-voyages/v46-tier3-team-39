"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import WelcomeImg from "../images/welcomeBack.png";
import { useDashBoard } from "../context/DashboardContext";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
const WelcomeBack = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const { profileData } = dashboardContext;
  const name = profileData.name?.split(" ")[0];
  return (
    <Typography
      variant="h4"
      className="flex justify-center text-center font-semibold tracking-tight w-full text-3xl break-words pt-[max(2.5%,1rem)] xs:mb-4 xs:pt-0"
    >
      Welcome back {name}!
    </Typography>
  );
};
const GreetingMessage = () => {
  const dashboardContext = useDashBoard();
  const windowWidth = useWindowWidth();
  if (!dashboardContext) return <></>;
  const { greetingBannerData } = dashboardContext;
  return (
    <div className="flex justify-center items-center flex-col w-full pr-[max(2%,1rem)] pl-[max(3.5%,1.5rem)] pb-[max(3.5%,1.5rem)] pt-[max(1.25%,0.5rem)] xs:py-[max(3.5%,1.5rem)]">
      {windowWidth >= 480 && <WelcomeBack />}
      <Typography
        variant="h6"
        className="flex justify-center font-medium w-full tracking-tight text-sm"
        sx={{
          lineHeight: 1.5,
        }}
      >
        You’ve attempted {greetingBannerData.weeklySubmissionCount.toString()}{" "}
        questions this week and generated{" "}
        {greetingBannerData.weeklyQuestionCount.toString()} ! Keep it up and
        improve your results!
      </Typography>
    </div>
  );
};

const GreetingBanner = () => {
  const windowWidth = useWindowWidth();
  return (
    <div className="flex w-full flex-col-reverse min-h-[7rem] border xs:min-h-[10rem] xs:flex-row md:mt-6">
      <GreetingMessage />
      <div className="flex flex-col w-full h-full justify-center min-h-[7rem] items-center xs:flex-row xs:pl-[max(2%,1rem)] lg:pr-[max(3.5%,1.5rem)] pt-[max(3.5%,1.5rem)] xs:pt-[max(2%,1rem)] lg:max-h-none">
        <Image
          src={WelcomeImg}
          alt="welcome-back-image"
          width={0}
          height={0}
          className="h-full w-auto max-h-[7rem] xs:max-h-none object-cover"
        />
        {windowWidth < 480 && <WelcomeBack />}
      </div>
    </div>
  );
};
export default GreetingBanner;
