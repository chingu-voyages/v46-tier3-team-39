import Profile from "../client/profile";
import GreetingBannerWrapper from "../client/greetingBannerWrapper";
const DashBoardWrapper = () => {
  return (
    <div className="flex flex-col w-full h-full grow space-y-5 md:space-y-0 md:flex-row md:space-x-[3%]">
      <Profile />
      <GreetingBannerWrapper />
    </div>
  );
};

export default DashBoardWrapper;
