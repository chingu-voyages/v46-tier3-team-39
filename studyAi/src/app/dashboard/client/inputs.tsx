"use client";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TextField from "@mui/material/TextField";
import CreatableSelect from "react-select/creatable";
import Chip from "@mui/material/Chip";
import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
export const LocationInput = ({}) => {
  /* <div className="flex items-center">
          <div className="mr-2">
            <FaLocationDot />
          </div>
          <div className="flex flex-row gap-1 items-center w-full">
            {locationElement}
          </div>
        </div> */
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
};
export const SchoolInput = ({
  school,
  isEditable,
  changeForm,
}: {
  school?: string;
  isEditable: boolean;
  changeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={"flex items-center" + (isEditable ? " flex-col" : "")}>
      <div className={"mr-2 flex flex-row" + (isEditable ? " w-full" : "")}>
        <SchoolOutlinedIcon className="text-4xl flex justify-center items-center w-7" />
        {isEditable && <span className="ml-2"> School</span>}
      </div>
      <div className="flex flex-row gap-1 items-center w-full">
        {isEditable ? (
          <TextField
            id="filled-basic"
            name="school"
            size="small"
            variant="filled"
            defaultValue={school || "N/A"}
            onChange={changeForm}
          />
        ) : (
          <Typography className="text-sm">
            {school ? school : "N/A"}{" "}
          </Typography>
        )}
      </div>
    </div>
  );
};
export const TagsInput = ({
  isEditable,
  passedTags,
  setFormData,
}: {
  isEditable: boolean;
  passedTags: string[];
  setFormData: Dispatch<
    SetStateAction<{
      tags: string[];
      name: string;
      school: string;
    }>
  >;
}) => {
  const tags = passedTags.map((e) => ({
    value: e,
    label: e,
  }));
  return (
    <div className={"flex items-center" + (isEditable ? " flex-col" : "")}>
      <div className={"mr-2 flex flex-row" + (isEditable ? " w-full" : "")}>
        <SellOutlinedIcon className="text-3xl w-7 flex justify-center items-center" />
        {isEditable && <span className="ml-2">Tags</span>}
      </div>
      <div className="flex flex-row items-center w-full">
        {isEditable ? (
          <CreatableSelect
            isMulti
            options={tags}
            isClearable
            name="tags"
            value={tags}
            className="w-full"
            onChange={(e) => {
              const tags = e.map((t) => t.value);
              setFormData((e) => ({
                ...e,
                tags,
              }));
            }}
          />
        ) : (
          <div className="flex flex-row gap-1 flex-wrap">
            {Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag, index) => (
                <Chip key={tag.value + index} label={tag.value}></Chip>
              ))
            ) : (
              <Typography className="text-sm">No tags</Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
