import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";

import { getServerSession } from "next-auth";
import { FaLocationDot, FaTag, FaGraduationCap } from "react-icons/fa6";
import ProfileForm from "../client/profileForm";

const Profile = async () => {
  const session = await getServerSession(options);
  if (!session) return <></>;
  console.log("sessionF: " + JSON.stringify(session, null, 1));
  return (
    <div className="">
      <div className=" mb-5">
        <UserProfile
          showUserInfo
          name={session.user.name}
          email={session.user.email}
          image={session.user.image}
        />
      </div>
      {session.user.name && <ProfileForm />}
    </div>
  );
};
export default Profile;
