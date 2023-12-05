import Profile from "../client/profile/profile";
import DashboardBody from "../client/dashboardBody";
const DashboardWrapper = () => {
  return (
    <div className="flex flex-col w-full h-full grow space-y-5 px-[4%] md:px-0 md:space-y-0 md:flex-row md:space-x-[3%] md:pr-[3%]">
      <Profile />
      <DashboardBody />
    </div>
  );
};

export default DashboardWrapper;
