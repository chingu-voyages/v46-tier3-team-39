"use client";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TextField from "@mui/material/TextField";
import CreatableSelect from "react-select/creatable";
import Chip from "@mui/material/Chip";
import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
export const InputWrapper = ({
  isEditable,
  title,
  children,
}: {
  isEditable: boolean;
  title: {
    value: string;
    icon: React.ReactNode;
  };
  children: React.ReactNode;
}) => {
  return (
    <div className={"flex items-center" + (isEditable ? " flex-col" : "")}>
      <div
        className={"flex flex-row items-center" + (isEditable ? " w-full" : "")}
      >
        {title.icon}
        {isEditable && (
          <Typography className="ml-1 text-sm">{title.value}</Typography>
        )}
      </div>
      <div className="flex flex-row items-center w-full">{children}</div>
    </div>
  );
};
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
    <InputWrapper
      title={{
        value: "School",
        icon: (
          <SchoolOutlinedIcon className="text-4xl flex justify-center items-center w-7" />
        ),
      }}
      isEditable={isEditable}
    >
      {isEditable ? (
        <TextField
          id="filled-basic"
          name="school"
          size="small"
          variant="filled"
          defaultValue={school || "N/A"}
          onChange={changeForm}
          className="w-full mt-2"
          inputProps={{
            className: "text-sm px-2 py-0 h-9",
          }}
          sx={{
            minHeight: "unset",
          }}
        />
      ) : (
        <Typography className="text-sm ml-2">
          {school ? school : "N/A"}{" "}
        </Typography>
      )}
    </InputWrapper>
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
    <InputWrapper
      isEditable={isEditable}
      title={{
        value: "Tags",
        icon: (
          <SellOutlinedIcon className="text-4xl ml-1 w-6 flex justify-center items-center" />
        ),
      }}
    >
      {isEditable ? (
        <CreatableSelect
          isMulti
          options={tags}
          isClearable
          name="tags"
          value={tags}
          classNames={{
            control: () => "min-h-[2.25rem] items-center h-full",
            valueContainer: () => "p-0 py-[1px] px-2 text-sm",
            placeholder: () => "text-sm",
            menuList: () => "text-xs",
            input: () => "text-sm",
            multiValue: () => "text-xs",
            dropdownIndicator: () => "px-2 py-0",
            clearIndicator: () => "px-2 py-0",
          }}
          className="w-full mt-2"
          onChange={(e) => {
            const tags = e.map((t) => t.value);
            setFormData((e) => ({
              ...e,
              tags,
            }));
          }}
        />
      ) : (
        <div className="flex flex-row flex-wrap ml-2">
          {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((tag, index) => (
              <Chip key={tag.value + index} label={tag.value}></Chip>
            ))
          ) : (
            <Typography className="text-sm">No tags</Typography>
          )}
        </div>
      )}
    </InputWrapper>
  );
};
