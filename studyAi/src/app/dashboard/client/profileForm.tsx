"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ProfileForm = async () => {
  const session = useSession();
  const [tags, setTags] = useState(session.data ? session.data.user.tags : []);

  return (
    <form className="w-full">
      {/* <UserProfile
        showUserInfo
        name={session.data.user.name}
        email={session.data.user.email}
        image={session.data.user.image}
      /> */}
    </form>
  );
};
export default ProfileForm;
