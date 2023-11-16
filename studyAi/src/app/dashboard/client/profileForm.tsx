"use client";
import { UserProfile } from "@/app/util/components/navigation/client/userProfile";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { gql } from "../../../../graphql/generated";
import TextField from "@mui/material/TextField";
import CreatableSelect from 'react-select/creatable';
import Chip from '@mui/material/Chip';

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
      },
    )
    {
      tags
      name
      school
    }
  }
`);
const ProfileForm = (
  {isEditable, formData, setFormData, toggleEditable}:
  {isEditable?: boolean, formData: any, setFormData?: any, toggleEditable: any}) => {
  const session = useSession();
  // const [tags, setTags] = useState(session.data ? session.data.user.tags : []);
  const [name, setName] = useState(session.data ? session.data.user.name : "");
  const [location, setLocation] = useState(
    session.data && session.data.user.location
      ? session.data.user.location
      : {
          locationType: "Point",
          coordinates: [0, 0],
          locationName: "",
        }
  );
  const [school, setSchool] = useState(
    session.data && session.data.user.school ? session.data.user.school : ""
  );
  const id = session.data ? session.data.user.id : "";
  // console.log('1. session: ' + JSON.stringify(session , null, 1))
  // console.log('2. session.data.user.id: ' + session?.data?.user.id)

  const tags = [{value: 'eating', label: 'Eating'},
                {value: 'sleeping', label: 'Sleeping'}];

  const [mutationQuery, { loading, error, data }] = useMutation(
    UpdateUserProfileInfo as any);
  // console.log(data);
  const submitted = useRef(false);
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   submitted.current = true;
  //   try {
  //     submitted.current = false;
  //   } catch (err) {
  //     console.error(err);
  //     submitted.current = false;
  //   }
  //   try {
  //     const formData = new FormData(e.currentTarget);
  //     const data = Object.fromEntries(formData.entries());
  //     const { email, password, name } = data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log('location', location)
  // console.log('tags', tags)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitted.current) return;
    try {
      console.log('formData in mutation', formData)
      const res = await mutationQuery(
        {
          variables: {
            id: formData?.id || id,
            tags: {
              set: formData?.tags || tags,
            },
            name: {
              set: formData?.name || name,
            },
            school: {
              set: formData?.school || school,
            },
            location: {
              set: {
                locationType: formData?.location.locationType || location.locationType,
                coordinates: { set: formData?.location.coordinates || location.coordinates},
                locationName: formData?.locationName || location.locationName,
              },
            },
          },
        }
      );
      submitted.current = false;
    } catch (err) {
      console.log(err);
    }
    toggleEditable();
  }

  const changeForm = (e: any) => {
    const { name, value } = e.target;
    if (setFormData) {
      setFormData((prevFormData: any) => ({...prevFormData, [name]: value}))
    }
  }

  const locationElement = isEditable
  ? (<TextField size="small" name="location" variant="outlined"
    defaultValue={location.locationName}
    onChange={changeForm}/>)
  : (<div>{location.locationName? location.locationName : 'NA'}</div>)

  const schoolElement = isEditable
  ? (<TextField size="small" name="school" variant="outlined"
    defaultValue={school}
    onChange={changeForm} />)
  : (<div>{school? school : 'NA'}</div>)

  const tagsEditElement = <CreatableSelect
                            isMulti
                            options={tags}
                            isClearable
                            name="tags"
                            className="w-full"
                            onChange={(e) => {
                              if (setFormData) {
                                setFormData((prevFormData: any) => (
                                  {...prevFormData, tags: e}
                                  ))
                              }
                            }}/>

  const tagsElement = isEditable
  ? tagsEditElement
  : (<div className="flex flex-row gap-1 flex-wrap">
      {tags.length > 0
      ? tags?.map((tag: any, index: number) => (
          <Chip key={tag.value + index} label={tag.label}></Chip>
      ))
    : <div className="text-sm">No tags</div>}
  </div>)


  return (
    <div>

      {/* Form */}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2">
          {/* 1.Location */}
          <div className="flex items-center">
            <div className="mr-2">
              <FaLocationDot />
            </div>
            <div className="flex flex-row gap-1 items-center">
              {locationElement}</div>
          </div>
          {/* 2. Hat */}
          <div className="flex items-center">
            <div className="mr-2">
              <FaGraduationCap />
            </div>
            <div className="flex flex-row gap-1 items-center">{schoolElement}</div>
          </div>
          {/* 3. Tags */}
          <div className="flex w-full gap-1 items-center">
            <div className="mr-2 item-center">
              <FaTag />
            </div>
            <div className="flex flex-row items-center w-full">
              {tagsElement}
            </div>
          </div>
        </div>
        {isEditable
        && <button
          type="submit"
          className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5">
            Submit
          </button>
        }
      </form>
    </div>
  );
};
export default ProfileForm;
