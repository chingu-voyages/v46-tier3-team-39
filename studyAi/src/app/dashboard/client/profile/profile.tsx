"use client";
import ProfileForm, { ProfileFormAtnBtns } from "./profileForm";
import { useDashBoard } from "../../context/DashboardContext";
import { Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { parseInteger } from "@/app/util/parsers/parseInt";
import { useEffect, useState } from "react";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
const determineContainerClasses = (isCollapsed: boolean, isMobile: boolean) => {
  const isMobileClasses = !isMobile
    ? ["h-[calc(100vh-3.5rem)]", "grow", //"sticky", "top-0", "left-0"
    ]
    : ["border", "mt-5"];
  const isCollapsedClasses = ["overflow-hidden", "md:max-w-[2.5rem]"];
  const isNotCollapsedClasses = ["overflow-y-auto", "md:max-w-[17rem]"];
  const containerClasses = [
    "flex",
    "flex-col",
    "transition-all",
    "w-full",
    "border-Black",
    "border-solid",
    ...isMobileClasses,
  ];
  if (isCollapsed) containerClasses.push(...isCollapsedClasses);
  else containerClasses.push(...isNotCollapsedClasses);
  return containerClasses;
};
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
const Profile = () => {
  const dashboardContext = useDashBoard();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profileData, isEditable, setIsEditable } = dashboardContext || {};
  const width = useWindowWidth();
  const isMobile = width <= 768;
  useEffect(() => {
    if (isMobile)
      setIsCollapsed((prev) => {
        if (prev) return false;
        return prev;
      });
  }, [isMobile]);
  const containerClasses = determineContainerClasses(isCollapsed, isMobile);
  const isMobileClasses = isMobile
    ? []
    : ["min-w-[15rem] max-w-[calc(17rem-1px)]"];
  const innerContainerClassesCollapsed = !isCollapsed ? ["p-5"] : [];
  const innerContainerClasses = [
    "flex",
    "w-full",
    ...innerContainerClassesCollapsed,
    ...isMobileClasses,
  ];
  if (!dashboardContext) return <></>;
  return (
    <div className={containerClasses.join(" ")}>
      <div className={innerContainerClasses.join(" ")}>
        {isCollapsed && !isMobile && (
          <ProfileFormAtnBtns
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          />
        )}
        {(!isCollapsed || isMobile) && (
          <div className="flex flex-col w-full">
            <ProfileForm
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div className="flex flex-col w-full pb-4">
              <Typography className="font-semibold text-lg mb-4">
                Activity
              </Typography>
              <div className="flex flex-col w-full space-y-3">
                <QuestionInfo
                  answered={parseInteger(
                    profileData?.questionData?.answered || 0
                  )}
                  generated={parseInteger(
                    profileData?.questionData?.generated || 0
                  )}
                />
                <UsersReached
                  usersReached={parseInteger(profileData?.usersReached || 0)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
