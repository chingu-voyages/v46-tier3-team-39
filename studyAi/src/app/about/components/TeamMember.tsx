import LinkedInIcon from "./client/linkedInIcon";
import Image from "next/image";
const TeamMember = ({
  name,
  role,
  avatarURL,
  linkedInURL,
}: {
  name: string;
  role: string;
  avatarURL: string;
  linkedInURL: string;
}) => {
  return (
    <div className="sm:max-w-sm flex flex-col items-center">
      {/* <img className="w-3/6" src={avatarURL} alt="Placeholder Avatar"/> */}
      <div className="w-3/6 relative aspect-square">
        <Image
          className="w-3/6"
          fill
          style={{ objectFit: "cover" }}
          src={avatarURL}
          alt="Placeholder Avatar"
        />
      </div>
      <div className="flex">
        <a className="mr-2" href={linkedInURL} target="_blank">
          <LinkedInIcon />
        </a>
        <div>
          <h1 className="text-sm sm:text-3xl font-small">{name}</h1>
          <h2 className="text-2xs uppercase">{role}</h2>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
