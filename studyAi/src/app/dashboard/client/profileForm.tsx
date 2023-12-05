"use client";
import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import { UpdateUserProfileInfo } from "@/gql/mutations/userMutation";
import { useDashBoard } from "../context/DashboardContext";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { SchoolInput, TagsInput } from "./inputs";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
export const ProfileFormAtnBtns = ({
  isCollapsed,
  setIsCollapsed,
  isEditable,
  setIsEditable,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable?: boolean;
  setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const collapsedClassNames = isCollapsed
    ? ["flex-col-reverse", "w-[calc(2.5rem-1px)]", "justify-center", "pt-2"]
    : ["flex-row"];
  const atnBtnClassNames = ["flex", "items-center", ...collapsedClassNames];
  return (
    <div className={atnBtnClassNames.join(" ")}>
      {!isEditable && (
        <IconButton
          type="button"
          onClick={() => {
            if (setIsEditable) setIsEditable((prev: boolean) => !prev);
            setIsCollapsed(false);
          }}
          className="aspect-square h-8 p-0"
          sx={{
            minHeight: "unset",
          }}
        >
          <EditOutlinedIcon className="text-lg" />
        </IconButton>
      )}
      {!isMobile && (
        <IconButton
          type="button"
          className="aspect-square h-8 p-0"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? (
            <KeyboardArrowRightIcon className="text-lg" />
          ) : (
            <KeyboardArrowLeftIcon className="text-lg" />
          )}
        </IconButton>
      )}
    </div>
  );
};
const ProfileForm = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dashboardContext = useDashBoard();
  const [mutationQuery, { loading, error }] = useMutation(
    UpdateUserProfileInfo
  );
  const { profileData, setProfileData, isEditable, setIsEditable } =
    dashboardContext || {};
  const [formData, setFormData] = useState({
    tags: profileData?.tags || [],
    name: profileData?.name || "",
    school: profileData?.school || "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    try {
      const { data: result } = await mutationQuery({
        variables: {
          id: profileData?.id || "",
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
          tags: profileData?.tags || [],
          name: profileData?.name || "",
          school: profileData?.school || "",
        });
      if (setProfileData)
        setProfileData((prev: Partial<User>) => ({
          ...prev,
          name: data.name || prev.name,
          tags: data.tags || prev.tags,
          school: data.school || prev.school,
        }));
      if (setIsEditable) setIsEditable((prev: boolean) => !prev);
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
    if (setIsEditable) setIsEditable((prev: boolean) => !prev);
    if (setFormData)
      setFormData({
        tags: profileData?.tags || [],
        name: profileData?.name || "",
        school: profileData?.school || "",
      });
  };
  if (!dashboardContext) return <></>;
  return (
    <>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-3">
          <Typography variant="h6">Your Profile</Typography>
          <ProfileFormAtnBtns
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          />
        </div>
        <div className="flex flex-row justify-between mb-5">
          <div className="flex justify-center items-center h-14 w-full">
            <UserProfile
              isEditable={isEditable}
              name={formData.name}
              email={profileData?.email}
              image={profileData?.image}
              changeForm={changeForm}
              showUserInfo
            />
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
            isEditable={!!isEditable}
          />
          <TagsInput
            isEditable={!!isEditable}
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
