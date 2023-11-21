"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import ProfileForm from "./profileForm";
import { FaClipboardQuestion, FaPeopleGroup } from "react-icons/fa6";
import { useDashBoard } from "../context/DashboardContext";

const ProfileWrapper = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const {
    isEditable,
    profileData,
    setIsEditable,
    setProfileData,
    greetingBannerData,
  } = dashboardContext;

  return (
    <div>
      <div className=" mb-5">
        <UserProfile
          setFormData={setProfileData}
          isEditable={isEditable}
          name={profileData.name}
          email={profileData.email}
          image={profileData.image}
          showUserInfo
        />
      </div>
      <button
        className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5"
        onClick={() => setIsEditable((prev: boolean) => !prev)}
      >
        {isEditable ? "Cancel Editing" : "Edit Profile"}
      </button>
      {<ProfileForm />}
      <div className="border-0 border-black" />

      <div>
        <h2 className="font-bold text-lg mb-1">Activity</h2>
        <div className="flex flex-col">
          <div className="mr-2 flex">
            <div className=" border-0 flex justify-center items-center mr-2 ">
              <FaClipboardQuestion />
            </div>
            <div className="font-bold text-md">Question</div>
          </div>
          <div className=" flex flex-col">
            <div className=" flex flex-row gap-1">
              {" "}
              <div className=" invisible">
                <FaClipboardQuestion />
              </div>
              <div>
                Answered: {greetingBannerData.submissionCount.toString()}
              </div>
              <div>
                Generated: {greetingBannerData.questionCount.toString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <div className="mr-2 flex ">
            <div className=" border-0 flex justify-center items-center mr-2">
              <FaPeopleGroup />
            </div>
            <div className="font-bold text-md">Community</div>
          </div>
          <div className=" flex flex-row">
            <div className="invisible mr-2">
              <FaPeopleGroup />
            </div>
            <div>Impacted {profileData.usersReached} users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
