import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile, ProfileDropdown, UserProfileNav } from "@/app/util/components/navigation/client/userProfile";
import  ProfileWrapper from '../client/profileWrapper'
import { getServerSession } from "next-auth";
import { FaLocationDot, FaTag, FaGraduationCap } from "react-icons/fa6";

const Profile = async ({questionCount, submissionCount}
  : {questionCount: number, submissionCount: number}) => {
  const session = await getServerSession(options);


  if (!session) return <></>;
  console.log("session in profile: " + JSON.stringify(session, null, 1));
  return (
    <div className="">
      {session && <ProfileWrapper
          session={session}
          questionCount={questionCount}
          submissionCount={submissionCount} />}
    </div>
  );
};
export default Profile;
