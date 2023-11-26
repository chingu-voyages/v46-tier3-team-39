"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import WelcomeImg from "../images/welcomeBack.png";
import { useDashBoard } from "../context/DashboardContext";

const GreetingMessage = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const { greetingBannerData, profileData } = dashboardContext;

  return (
    <div className="flex justify-center items-center flex-col w-full pr-[max(2%,1rem)] pl-[max(4%,2rem)] py-[max(4%,2rem)] ">
      <Typography
        variant="h4"
        className="flex justify-center text-center font-semibold tracking-tight w-full mb-4 text-4xl"
      >
        Welcome back {profileData.name}!
      </Typography>
      <Typography
        variant="h6"
        className="flex justify-center font-medium w-full tracking-tight text-base"
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
  return (
    <div className="flex w-full flex-col-reverse lg:flex-row">
      <GreetingMessage />
      <div className="flex w-full h-full justify-center items-center pl-[max(2%,1rem)] pr-[max(4%,2rem)] py-[max(4%,2rem)]">
        <Image
          src={WelcomeImg}
          alt="welcome-back-image"
          width={0}
          height={0}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};
export default GreetingBanner;
