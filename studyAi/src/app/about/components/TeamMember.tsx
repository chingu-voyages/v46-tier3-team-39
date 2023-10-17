import Link from "next/link";

const TeamMember = ({name, role, avatarURL, linkedInURL}: {name: string, role: string, avatarURL: string, linkedInURL: string}) => {
    return (
        <>
            <img src={avatarURL} alt="Could not load avatar" />
            <h1><Link href={linkedInURL}></Link>{name}</h1>
            <h2>{role}</h2>
        </>
    )
}

export default TeamMember;