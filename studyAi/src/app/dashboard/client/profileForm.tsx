"use client";
import { FaLocationDot, FaTag, FaGraduationCap } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import CreatableSelect from "react-select/creatable";
import Chip from "@mui/material/Chip";
import { User } from "@prisma/client";
import { UpdateUserProfileInfo } from "@/gql/queries/userQueries";
import { useDashBoard } from "../context/DashboardContext";

const ProfileForm = () => {
  const dashboardContext = useDashBoard();
  console.log(dashboardContext, "context");
  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo,
    {
      onCompleted: (data) => {
        dashboardContext?.setProfileData((prev: Partial<User>) => ({
          ...prev,
          tags: data.updateOneUser?.tags || prev.tags,
          school: data.updateOneUser?.school || prev.school,
        }));
      },
    }
  );

  const submitted = useRef(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted.current) return;
    try {
      await mutationQuery({
        variables: {
          id: dashboardContext?.profileData?.id || "",
          tags: {
            set: dashboardContext?.profileData
              ? dashboardContext?.profileData.tags
              : [],
          },
          name: {
            set: dashboardContext?.profileData?.name,
          },
          school: {
            set: dashboardContext?.profileData?.school,
          },
          // location: {
          //   set: {
          //     locationType:
          //       dashboardContext?.profileData.location.locationType || location.locationType,
          //     coordinates: {
          //       set: dashboardContext?.profileData?.location.coordinates || location.coordinates,
          //     },
          //     locationName: dashboardContext?.profileData?.locationName || location.locationName,
          //   },
          // },
        },
      });
      submitted.current = false;
    } catch (err) {
      console.log(err);
    }
    dashboardContext?.setIsEditable((prev: boolean) => !prev);
  };

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (dashboardContext?.setProfileData) {
      dashboardContext?.setProfileData((prev: Partial<User>) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const locationElement = dashboardContext?.isEditable ? (
    <TextField
      size="small"
      name="location"
      variant="outlined"
      defaultValue={
        dashboardContext?.profileData.location?.locationName || "N/A"
      }
      onChange={changeForm}
    />
  ) : (
    <div>{dashboardContext?.profileData.location?.locationName || "N/A"}</div>
  );

  const schoolElement = dashboardContext?.isEditable ? (
    <TextField
      size="small"
      name="school"
      variant="outlined"
      defaultValue={dashboardContext?.profileData.school || "N/A"}
      onChange={changeForm}
    />
  ) : (
    <div>
      {dashboardContext?.profileData.school
        ? dashboardContext?.profileData.school
        : "N/A"}
    </div>
  );
  const tags = dashboardContext?.profileData.tags || [];
  const tagsEditElement = (
    <CreatableSelect
      isMulti
      options={tags.map((e) => ({
        value: e,
        label: e,
      }))}
      isClearable
      name="tags"
      value={tags.map((e) => ({
        value: e,
        label: e,
      }))}
      // value={dashboardContext?.profileData.tags || []}
      className="w-full"
      onChange={(e) => {
        if (dashboardContext?.setProfileData) {
          dashboardContext?.setProfileData((prev: Partial<User>) => ({
            ...prev,
            tags: e.map((t) => t.value),
          }));
        }
      }}
    />
  );

  const tagsElement = dashboardContext?.isEditable ? (
    tagsEditElement
  ) : (
    <div className="flex flex-row gap-1 flex-wrap">
      {Array.isArray(dashboardContext?.profileData.tags) ? (
        dashboardContext?.profileData.tags.map((tag: string, index: number) => (
          <Chip key={tag + index} label={tag}></Chip>
        ))
      ) : (
        <div className="text-sm">No tags</div>
      )}
    </div>
  );

  return (
    <form className="w-full" onSubmit={handleSubmit}>
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
      {dashboardContext?.isEditable && (
        <button
          type="submit"
          className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5"
        >
          Submit
        </button>
      )}
    </form>
  );
};
export default ProfileForm;
