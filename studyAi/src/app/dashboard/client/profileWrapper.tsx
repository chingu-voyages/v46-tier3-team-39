"use client";
import { useState } from "react";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import ProfileForm from "./profileForm";
import { FaClipboardQuestion, FaPeopleGroup } from "react-icons/fa6";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const ProfileWrapper = ({
  questionCount = 0,
  submissionCount = 0,
}: {
  questionCount?: number;
  submissionCount?: number;
}) => {
  const sessionData = useSession();
  const session = sessionData.data;
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Session["user"]>>({
    ...session?.user,
    id: session?.user?.id ? session?.user?.id : "",
    // tags: session?.user?.tags? session?.user?.tags : [],
    tags: ["eating", "sleeping"],
    name: session?.user?.name ? session?.user?.name : "",
    school: session?.user?.school ? session?.user?.school : "",
    location: session?.user?.location
      ? session?.user?.location
      : {
          locationType: "Point",
          coordinates: [0, 0],
          locationName: "",
        },
  });
  const toggleEditable = () => {
    setIsEditable((isEditable) => !isEditable);
  };

  if (!session?.user) {
    return <></>;
  }

  return (
    <div>
      <div className=" mb-5">
        <UserProfile
          setFormData={setFormData}
          isEditable={isEditable}
          name={session?.user?.name}
          email={session?.user?.email}
          image={session?.user?.image}
          showUserInfo
        />
      </div>
      {/* Button */}
      <button
        className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5"
        onClick={toggleEditable}
      >
        {isEditable ? "Cancel Editing" : "Edit Profile"}
      </button>
      {
        <ProfileForm
          isEditable={isEditable}
          formData={formData}
          setFormData={setFormData}
          toggleEditable={toggleEditable}
        />
      }
      <div className="border-0 border-black" />

      <div>
        <h2 className="font-bold text-lg mb-1">Activity</h2>
        {/* 1. Questions   */}
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
              <div>Answered: {submissionCount?.toString()}</div>
              <div>Generated: {questionCount?.toString()}</div>
            </div>
          </div>
        </div>
        {/* 2. Community */}
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
            <div>Impacted {session?.user?.usersReached} users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
