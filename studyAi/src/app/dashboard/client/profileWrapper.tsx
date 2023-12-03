"use client";
import ProfileForm from "./profileForm";
import { useDashBoard } from "../context/DashboardContext";
import { Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { parseInteger } from "@/app/util/parsers/parseInt";
const ProfileInfoItem = ({
  icon,
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex">
      <div className="mr-2 text-3xl w-7 flex justify-center">{icon}</div>
      <div className="flex flex-col">
        <Typography className="font-semibold text-sm tracking-normal">
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
};
const QuestionInfo = ({
  answered,
  generated,
}: {
  answered?: string;
  generated?: string;
}) => {
  return (
    <ProfileInfoItem icon={<HelpOutlineIcon />} title={"Question"}>
      <div className="flex flex-row space-x-4">
        <Typography className="text-xs tracking-normal">
          Answered: {answered}
        </Typography>
        <Typography className="text-xs tracking-normal">
          Generated: {generated}
        </Typography>
      </div>
    </ProfileInfoItem>
  );
};
const UsersReached = ({ usersReached }: { usersReached: string }) => {
  return (
    <ProfileInfoItem icon={<GroupsOutlinedIcon />} title={"Community"}>
      <div className="flex flex-row">
        <Typography className="text-xs">
          Impacted {usersReached} users
        </Typography>
      </div>
    </ProfileInfoItem>
  );
};
const ProfileWrapper = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const { profileData } = dashboardContext;

  return (
    <div className="flex flex-col w-full">
      {<ProfileForm />}
      <div className="flex flex-col w-full">
        <Typography className="font-semibold text-lg mb-4">Activity</Typography>
        <div className="flex flex-col w-full space-y-3">
          <QuestionInfo
            answered={parseInteger(profileData.questionData?.answered || 0)}
            generated={parseInteger(profileData.questionData?.generated || 0)}
          />
          <UsersReached
            usersReached={parseInteger(profileData.usersReached || 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
