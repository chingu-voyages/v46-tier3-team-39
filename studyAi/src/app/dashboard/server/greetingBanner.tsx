import { Box, Typography } from "@mui/material";
import Image from "next/image";
import WelcomeImg from "../images/welcomeBack.png";
const GreetingImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-5/6 sm:hidden sm:mt-3">
        <Image
          src={WelcomeImg}
          alt="welcome-back-image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto sm:w-auto sm:h-full sm:object-cover"
        />
      </div>
      {children}
      <div className="sm:w-3/6 hidden sm:block sm:mt-3">
        <Image
          src={WelcomeImg}
          alt="welcome-back-image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto sm:w-auto sm:h-full sm:object-cover"
        />
      </div>
    </>
  );
};
const GreetingMessage = ({
  name,
  questionCount,
  submissionCount,
}: {
  name: string;
  questionCount: number;
  submissionCount: number;
}) => {
  return (
    <div className="flex justify-center items-center flex-col h-full w-full sm:w-3/6 p-[max(4%,2rem)]">
      <Typography
        variant="h4"
        className="flex justify-center text-center font-semibold tracking-tight w-full mb-4"
      >
        Welcome back {name}!
      </Typography>
      <Typography
        variant="h6"
        className="flex justify-center font-medium w-full tracking-tight"
      >
        You’ve completed {submissionCount} questions this week and generated{" "}
        {questionCount} ! Keep it up and improve your results!
      </Typography>
    </div>
  );
};
const GreetingBanner = (props: {
  name: string;
  questionCount: number;
  submissionCount: number;
}) => {
  return (
    <Box className="flex flex-col items-center sm:items-stretch sm:border sm:flex-row lg:w-4/6 w-full">
      <GreetingImage>
        <GreetingMessage {...props} />
      </GreetingImage>
    </Box>
  );
};
export default GreetingBanner;