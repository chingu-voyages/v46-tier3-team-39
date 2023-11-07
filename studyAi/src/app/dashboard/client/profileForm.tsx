"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { gql } from "../../../../graphql/generated";
const UpdateUserProfileInfo = gql(`
  mutation UpdateUserProfileInfo (
    $id: String!,
    $tags: UserUpdatetagsInput,
    $name: StringFieldUpdateOperationsInput,
    $school: NullableStringFieldUpdateOperationsInput, 
    $location: LocationDataNullableUpdateEnvelopeInput
  ) {
    updateOneUser(
      where: { id: $id },
      data: {
        tags: $tags,
        name: $name,
        school: $school
        location: $location
      }
    )
    {
      tags
      name
      school
    }
  }
`);
const ProfileForm = async () => {
  const session = useSession();
  const [tags, setTags] = useState(session.data ? session.data.user.tags : []);
  const [name, setName] = useState(session.data ? session.data.user.name : "");
  const [location, setLocation] = useState(
    session.data && session.data.user.location
      ? session.data.user.location
      : {
          locationType: "Point",
          coordinates: [0, 0],
        }
  );
  const [school, setSchool] = useState(
    session.data && session.data.user.school ? session.data.user.school : ""
  );
  const id = session.data ? session.data.user.id : "";
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo,
    {
      variables: {
        id: id,
        tags: {
          set: tags,
        },
        name: {
          set: name,
        },
        school: {
          set: school,
        },
        location: {
          set: {
            locationType: location.locationType,
            coordinates: { set: location.coordinates },
          },
        },
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
