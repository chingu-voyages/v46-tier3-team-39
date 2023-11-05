"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

const UpdateUserProfileInfo = gql`
  mutation UpdateUserProfileInfo(
    $tags: [String!]!,
    $name: String!,
    $school: String, 
    $location: {
      locationType: String
      coordinates: [Float!]!
    }
  ){
    updateUser()
  }
`;
const ProfileForm = async () => {
  const session = useSession();
  const [tags, setTags] = useState(session.data ? session.data.user.tags : []);
  const [name, setName] = useState(session.data ? session.data.user.name : "");
  const [location, setLocation] = useState(
    session.data ? session.data.user.location : null
  );
  const [school, setSchool] = useState(
    session.data ? session.data.user.school : ""
  );
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo,
    {
      variables: {
        tags,
        name,
        school,
        location,
      },
    }
  );
  const submitted = useRef(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitted.current = true;
    try {
      submitted.current = false;
    } catch (err) {
      console.error(err);
      submitted.current = false;
    }
    // try {
    //   const formData = new FormData(e.currentTarget);
    //   const data = Object.fromEntries(formData.entries());
    //   const { email, password, name } = data;
    // } catch (err) {
    //   console.log(err);
    // }
  };
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
