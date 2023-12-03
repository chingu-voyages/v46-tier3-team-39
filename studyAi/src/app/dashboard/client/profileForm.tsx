"use client";
import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import { UpdateUserProfileInfo } from "@/gql/mutations/userMutation";
import { useDashBoard } from "../context/DashboardContext";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { SchoolInput, TagsInput } from "./inputs";

const ProfileForm = () => {
  const dashboardContext = useDashBoard();
  const [mutationQuery, { loading, error }] = useMutation(
    UpdateUserProfileInfo
  );
  if (!dashboardContext) return <></>;
  const { profileData, setProfileData, isEditable, setIsEditable } =
    dashboardContext;
  const [formData, setFormData] = useState({
    tags: profileData.tags || [],
    name: profileData.name || "",
    school: profileData.school || "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    try {
      const { data: result } = await mutationQuery({
        variables: {
          id: profileData.id || "",
          tags: {
            set: formData.tags || [],
          },
          name: {
            set: formData.name,
          },
          school: {
            set: formData.school,
          },
          // location: {
          //   set: formData.current.name,
          // }
        },
      });
      const data = result?.updateOneUser;
      if (!data)
        return setFormData({
          tags: profileData.tags || [],
          name: profileData.name || "",
          school: profileData.school || "",
        });
      setProfileData((prev: Partial<User>) => ({
        ...prev,
        name: data.name || prev.name,
        tags: data.tags || prev.tags,
        school: data.school || prev.school,
      }));
      setIsEditable((prev: boolean) => !prev);
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
        formData.school = value;
        break;
      case "name":
        formData.name = value;
        break;
    }
  };

  const cancel = () => {
    setIsEditable((prev: boolean) => !prev);
    setFormData({
      tags: profileData.tags || [],
      name: profileData.name || "",
      school: profileData.school || "",
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className={`mb-5`}>
          <div className="flex flex-row justify-between">
            <div className="flex justify-center items-center h-14">
              <UserProfile
                isEditable={isEditable}
                name={formData.name}
                email={profileData.email}
                image={profileData.image}
                changeForm={changeForm}
                showUserInfo
              />
            </div>
            {!isEditable && (
              <IconButton
                type="button"
                onClick={() => setIsEditable((prev: boolean) => !prev)}
                className="aspect-square h-8 p-0"
                sx={{
                  minHeight: "unset",
                }}
              >
                <EditOutlinedIcon className="text-lg" />
              </IconButton>
            )}
          </div>
        </div>
        <div
          className={` flex flex-col ${
            isEditable ? "mb-7 space-y-5" : "mb-5 space-y-3"
          }`}
        >
          <SchoolInput
            school={formData.school}
            changeForm={changeForm}
            isEditable={isEditable}
          />
          <TagsInput
            isEditable={isEditable}
            passedTags={formData.tags}
            setFormData={setFormData}
          />
        </div>
        {isEditable && (
          <div className="flex flex-row space-x-2 mb-7">
            <Button
              type="submit"
              variant="contained"
              className="rounded-none"
              color="primary"
              disabled={loading}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => cancel()}
              className="rounded-none"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
      <div className="border-b border-b-neutral-neutral90 mb-5" />
    </>
  );
};
export default ProfileForm;
