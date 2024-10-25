import Profile from "./profile/profile";
import DashboardBody from "./dashboardBody";
import RecentSubmissionsContainer from "./recentSubmissions/RecentSubmissionsContainer";
const DashboardWrapper = () => {
  return (
    <div className="flex flex-col w-full h-full grow space-y-5 px-[4%] md:px-0 md:space-y-0 md:flex-row md:pr-[3%]">
      <Profile />
      <RecentSubmissionsContainer>
        <DashboardBody />
      </RecentSubmissionsContainer>
    </div>
  );
};

export default DashboardWrapper;
