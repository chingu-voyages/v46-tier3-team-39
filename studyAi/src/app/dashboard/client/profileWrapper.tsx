"use client";
import ProfileForm from "./profileForm";
import { useDashBoard } from "../context/DashboardContext";
import { Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { parseInteger } from "@/app/util/parsers/parseInt";
const QuestionInfo = ({
  answered,
  generated,
}: {
  answered?: string;
  generated?: string;
}) => {
  return (
    <div className="flex">
      <div className="mr-2 text-3xl w-7 flex justify-center">
        <HelpOutlineIcon />
      </div>
      <div className="flex flex-col">
        <Typography className="font-semibold text-base">Question</Typography>
        <div className="flex flex-row space-x-4">
          <Typography className="text-sm tracking-normal">
            Answered: {answered}
          </Typography>
          <Typography className="text-sm tracking-normal">
            Generated: {generated}
          </Typography>
        </div>
      </div>
    </div>
  );
};
const UsersReached = ({ usersReached }: { usersReached: string }) => {
  return (
    <div className="flex">
      <div className="mr-2 text-3xl w-7 flex justify-center">
        <GroupsOutlinedIcon />
      </div>
      <div className="flex flex-col">
        <Typography className="font-semibold text-base">Community</Typography>
        <div className="flex flex-row gap-1">
          <Typography className="text-sm">
            Impacted {usersReached} users
          </Typography>
        </div>
      </div>
    </div>
  );
};
const ProfileWrapper = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const { profileData } = dashboardContext;

  return (
    <div>
      {<ProfileForm />}
      <div>
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
