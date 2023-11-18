import Link from "next/link";
import LinkedInIcon from "./client/linkedInIcon";

const TeamMember = ({name, role, avatarURL, linkedInURL}: {name: string, role: string, avatarURL: string, linkedInURL: string}) => {
    return (
        <div className="sm:max-w-sm">
            <img className="w-full" src={avatarURL} alt="Could not load avatar"/>
            <div className="flex">
                <a className="mr-2" href={linkedInURL} target="_blank"><LinkedInIcon/></a>
                <div>
                    <h1 className="text-sm sm:text-6xl font-medium">{name}</h1>
                    <h2 className="text-2xs uppercase">{role}</h2>
                </div>
            </div>
        </div>
    )
}

export default TeamMember;