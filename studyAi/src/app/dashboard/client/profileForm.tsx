"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { gql } from "../../../../graphql/generated";

import { FaLocationDot, FaTag, FaGraduationCap } from "react-icons/fa6";

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
const ProfileForm = () => {
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
  console.log('1. session: ' + JSON.stringify(session , null, 1))
  console.log('2. session.data.user.id: ' + session?.data?.user.id)
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo as any,
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
  console.log(data);
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
    <div>
      {/* Button */}
      <div className=" border rounded-lg border-primary-primary60 text-primary-primary60 flex w-full py-3 justify-center mb-5">
        Edit Profile
      </div>
      {/* Form */}
      <form className="w-full">
        {/* <UserProfile
        showUserInfo
        name={session.data.user.name}
        email={session.data.user.email}
        image={session.data.user.image}
      /> */}

        <div className="mb-5 flex flex-col">
          {/* 1.Location */}
          <div className="flex">
            <div className="mr-4">
              <FaLocationDot />
            </div>
            <div className="">Location</div>
          </div>
          {/* 2. Hat */}
          <div className="flex">
            <div className="mr-4">
              <FaGraduationCap />
            </div>
            <div className="">School:{school}</div>
          </div>
          {/* 3. Tags */}
          <div className="flex">
            <div className="mr-4">
              <FaTag />
            </div>
            <div className="">Tags</div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ProfileForm;
