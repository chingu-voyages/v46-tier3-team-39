"use client";
import { FaLocationDot, FaTag, FaGraduationCap } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import CreatableSelect from "react-select/creatable";
import Chip from "@mui/material/Chip";
import { User } from "@prisma/client";
import { UpdateUserProfileInfo } from "@/gql/queries/userQueries";
import { useDashBoard } from "../context/DashboardContext";

const ProfileForm = () => {
  const dashboardContext = useDashBoard();
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo,
    {
      onCompleted: (data) => {
        setProfileData((prev: Partial<User>) => ({
          ...prev,
          tags: data.updateOneUser?.tags || prev.tags,
          school: data.updateOneUser?.school || prev.school,
        }));
      },
    }
  );
  const submitted = useRef(false);

  if (!dashboardContext) return <></>;
  const { profileData, setProfileData, isEditable, setIsEditable } =
    dashboardContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted.current) return;
    try {
      await mutationQuery({
        variables: {
          id: profileData?.id || "",
          tags: {
            set: profileData ? profileData.tags : [],
          },
          name: {
            set: profileData?.name,
          },
          school: {
            set: profileData?.school,
          },
          // location: {
          //   set: {
          //     locationType:
          //       profileData.location.locationType || location.locationType,
          //     coordinates: {
          //       set: profileData?.location.coordinates || location.coordinates,
          //     },
          //     locationName: profileData?.locationName || location.locationName,
          //   },
          // },
        },
      });
      submitted.current = false;
    } catch (err) {
      console.log(err);
    }
    setIsEditable((prev: boolean) => !prev);
  };

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const locationElement = isEditable ? (
  //   <TextField
  //     size="small"
  //     name="location"
  //     variant="outlined"
  //     defaultValue={profileData.location?.locationName || "N/A"}
  //     onChange={changeForm}
  //   />
  // ) : (
  //   <div>{profileData.location?.locationName || "N/A"}</div>
  // );

  const schoolElement = isEditable ? (
    <TextField
      size="small"
      name="school"
      variant="outlined"
      defaultValue={profileData.school || "N/A"}
      onChange={changeForm}
    />
  ) : (
    <div>{profileData.school ? profileData.school : "N/A"}</div>
  );

  const tags = profileData.tags?.map((e) => ({
    value: e,
    label: e,
  }));

  const tagsEditElement = (
    <CreatableSelect
      isMulti
      options={tags}
      isClearable
      name="tags"
      value={tags}
      className="w-full"
      onChange={(e) => {
        setProfileData((prev) => ({
          ...prev,
          tags: e.map((t) => t.value),
        }));
      }}
    />
  );

  const tagsElement = isEditable ? (
    tagsEditElement
  ) : (
    <div className="flex flex-row gap-1 flex-wrap">
      {Array.isArray(profileData.tags) ? (
        profileData.tags.map((tag: string, index: number) => (
          <Chip key={tag + index} label={tag}></Chip>
        ))
      ) : (
        <div className="text-sm">No tags</div>
      )}
    </div>
  );

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {isEditable && (
        <button
          type="submit"
          className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5"
        >
          Submit
        </button>
      )}
      <div className="mb-5 flex flex-col gap-2">
        {/* <div className="flex items-center">
          <div className="mr-2">
            <FaLocationDot />
          </div>
          <div className="flex flex-row gap-1 items-center w-full">
            {locationElement}
          </div>
        </div> */}
        <div className="flex items-center">
          <div className="mr-2">
            <FaGraduationCap />
          </div>
          <div className="flex flex-row gap-1 items-center w-full">
            {schoolElement}
          </div>
        </div>
        <div className="flex w-full gap-1 items-center">
          <div className="mr-2 item-center">
            <FaTag />
          </div>
          <div className="flex flex-row items-center w-full">{tagsElement}</div>
        </div>
      </div>
    </form>
  );
};
export default ProfileForm;
