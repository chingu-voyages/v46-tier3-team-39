import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { getServerSession } from "next-auth";

const Profile = async () => {
  const session = await getServerSession(options);
  if (!session) return <></>;

  return (
    <div className="w-2/6">
      <UserProfile
        showUserInfo
        name={session.user.name}
        email={session.user.email}
        image={session.user.image}
      />
    </div>
  );
};
export default Profile;
