"use client"
import { useState } from 'react'
import { UserProfile } from '@/app/util/components/navigation/client/userProfile'
import ProfileForm from './profileForm'

const ProfileWrapper = ({session}: {session?: any}) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
      ...session?.user,
      id: session?.user?.id? session?.user?.id : "",
      // tags: session?.user?.tags? session?.user?.tags : [],
      tags: ['eating', 'sleeping'],
      name: session?.user?.name? session?.user?.name : "",
      school: session?.user?.school? session?.user?.school : "",
      location: session?.user?.location? session?.user?.location : {
        locationType: "Point",
        coordinates: [0, 0],
        locationName: ""
      },
    });
    const toggleEditable = () => {
      setIsEditable((isEditable) => !isEditable);
    }
    console.log('formData', formData)

    if (!session?.user) {
      return <></>
    }

    return (
      <div>
        <div className=" mb-5">
        <UserProfile
          setFormData={setFormData}
          isEditable={isEditable}
          name={session?.user?.name}
          email={session?.user?.email}
          image={session?.user?.image}
          showUserInfo
        />
      </div>
        {/* Button */}
        <button
          className="border rounded-lg border-Black text-primary-primary50 flex w-full py-3 justify-center mb-5"
          onClick={toggleEditable}
          >
          {isEditable? 'Cancel Editing' : 'Edit Profile'}
        </button>
        {<ProfileForm isEditable={isEditable} formData={formData} setFormData={setFormData} toggleEditable={toggleEditable}/>}
        </div>
    )
}

export default ProfileWrapper
