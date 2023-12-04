import ProfileWrapper from "../client/profileWrapper";

const Profile = () => {
  return (
    <div className="flex w-full md:max-w-[17rem] border p-5">
      {<ProfileWrapper />}
    </div>
  );
};

export default Profile;
