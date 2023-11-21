import { options } from "@/authComponents/nextAuth/options";
import ProfileWrapper from "../client/profileWrapper";
import { getServerSession } from "next-auth";

const Profile = async ({
  questionCount,
  submissionCount,
}: {
  questionCount: number;
  submissionCount: number;
}) => {
  return (
    <div className="">
      {
        <ProfileWrapper
          questionCount={questionCount}
          submissionCount={submissionCount}
        />
      }
    </div>
  );
};
export default Profile;
