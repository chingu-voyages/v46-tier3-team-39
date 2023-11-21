import { Typography } from "@mui/material";
import Image from "next/image";
import WelcomeImg from "../images/welcomeBack.png";
import { useDashBoard } from "../context/DashboardContext";

const GreetingMessage = () => {
  const { profileData, greetingBannerData } = useDashBoard();

  return (
    <div className="flex justify-center items-center flex-col w-full p-[max(4%,2rem)] ">
      <Typography
        variant="h4"
        className="flex justify-center text-center font-semibold tracking-tight w-full mb-4"
      >
        Welcome back {profileData.name}!
      </Typography>
      <Typography
        variant="h6"
        className="flex justify-center font-medium w-full tracking-tight"
      >
        You’ve attempted {greetingBannerData.submissionCount.toString()} questions this week and
        generated {greetingBannerData.questionCount.toString()} ! Keep it up and improve your
        results!
      </Typography>
    </div>
  );
};

const GreetingBanner = () => {
  return (
    <div className="flex w-full flex-col-reverse lg:flex-row">
      <GreetingMessage />
      <div className="flex w-full h-full justify-center items-center">
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
