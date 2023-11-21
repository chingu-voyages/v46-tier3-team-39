import { options } from "@/authComponents/nextAuth/options";
import ProfileWrapper from "../client/profileWrapper";
import { getServerSession } from "next-auth";

const Profile = async ({}: {}) => {
  return (
    <div className="col-span-1 border p-5 md:col-span-1">
      <div className="">{<ProfileWrapper />}</div>
    </div>
  );
};
export default Profile;
