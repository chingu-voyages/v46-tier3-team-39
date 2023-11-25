"use client";
import { FaLocationDot, FaTag, FaGraduationCap, FaT } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import CreatableSelect from "react-select/creatable";
import Chip from "@mui/material/Chip";
import { User } from "@prisma/client";
import { UpdateUserProfileInfo } from "@/gql/queries/userQueries";
import { useDashBoard } from "../context/DashboardContext";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ProfileForm = () => {
  const dashboardContext = useDashBoard();
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo,
    {
      onCompleted: (data) => {
        setProfileData((prev: Partial<User>) => ({
          ...prev,
          name: data.updateOneUser?.name || prev.name,
          tags: data.updateOneUser?.tags || prev.tags,
          school: data.updateOneUser?.school || prev.school,
        }));
        setIsEditable((prev: boolean) => !prev);
      },
    }
  );
  const formData = useRef({ school: "", tags: [""], name: "" });
  const submitted = useRef(false);

  if (!dashboardContext) return <></>;
  const { profileData, setProfileData, isEditable, setIsEditable } =
    dashboardContext;
  formData.current = {
    name: profileData.name || "",
    school: profileData.school || "",
    tags: profileData.tags || [],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted.current) return;
    try {
      await mutationQuery({
        variables: {
          id: profileData.id || "",
          tags: {
            set: formData.current.tags || [],
          },
          name: {
            set: formData.current.name,
          },
          school: {
            set: formData.current.school,
          },
          // location: {
          //   set: formData.current.name,
          // }
        },
      });
      submitted.current = false;
    } catch (err) {
      console.log(err);
    }
  };

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "school":
        formData.current.school = value;
        break;
      case "name":
        formData.current.name = value;
        break;
    }
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
      id="filled-basic"
      name="school"
      size="small"
      variant="filled"
      defaultValue={formData.current.school || "N/A"}
      onChange={changeForm}
    />
  ) : (
    <div>{profileData.school ? profileData.school : "N/A"}</div>
  );

  const tags = formData.current.tags.map((e) => ({
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
        const tags = e.map((t) => t.value);
        formData.current.tags = tags;
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
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className=" mb-5">
          <div className="flex flex-row justify-between">
            <UserProfile
              isEditable={isEditable}
              name={formData.current.name}
              email={profileData.email}
              image={profileData.image}
              changeForm={changeForm}
              showUserInfo
            />
            {!isEditable && (
              <ModeEditIcon
                onClick={() => setIsEditable((prev: boolean) => !prev)}
              />
            )}
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2">
          {/* <div className="flex items-center">
          <div className="mr-2">
            <FaLocationDot />
          </div>
          <div className="flex flex-row gap-1 items-center w-full">
            {locationElement}
          </div>
        </div> */}
          <div
            className={"flex items-center" + (isEditable ? " flex-col" : "")}
          >
            <div
              className={"mr-2 flex flex-row" + (isEditable ? " w-full" : "")}
            >
              <FaGraduationCap />
              {isEditable && "School"}
            </div>
            <div className="flex flex-row gap-1 items-center w-full">
              {schoolElement}
            </div>
          </div>
          <div
            className={"flex items-center" + (isEditable ? " flex-col" : "")}
          >
            <div
              className={"mr-2 flex flex-row" + (isEditable ? " w-full" : "")}
            >
              <FaTag />
              {isEditable && "Tags"}
            </div>
            <div className="flex flex-row items-center w-full">
              {tagsElement}
            </div>
          </div>
          {isEditable && (
            <div className="flex flex-row">
              <button
                className="border border-Black  h-10 px-5 m-2 rounded-lg"
                type="submit"
              >
                Save
              </button>
              <button
                className="border border-Black  h-10 px-5 m-2 rounded-lg"
                onClick={() => setIsEditable((prev: boolean) => !prev)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
export default ProfileForm;
