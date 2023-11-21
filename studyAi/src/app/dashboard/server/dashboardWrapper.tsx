import Profile from "./profile";
import GreetingBannerWrapper from "../client/greetingBannerWrapper";

const DashBoardWrapper = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 m-5 md:gap-5 w-full sm:gap-y-5">
      <Profile />
      <GreetingBannerWrapper />
    </div>
  );
};

export default DashBoardWrapper;
