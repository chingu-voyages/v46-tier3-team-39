"use client";
import { User } from "@prisma/client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const blankProfileData = {
  id: "",
  tags: ["eating", "sleeping"],
  name: "",
  school: "",
  location: {
    locationType: "Point",
    coordinates: [0, 0],
    locationName: "",
  },
};

export interface GreetingBannerType {
  submissionCount: number;
  questionCount: number;
}

export type DashBoardProps = {
  isEditable: boolean;
  profileData: Partial<User>;
  greetingBannerData: GreetingBannerType;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  setProfileData: Dispatch<SetStateAction<Partial<User>>>;
  setGreetingBannerData: Dispatch<SetStateAction<GreetingBannerType>>;
};

const DashBoardContext = createContext<DashBoardProps | null>(null);

export const DashBoardProvider = ({
  initialProfileData,
  submissionCount,
  questionCount,
  children,
}: {
  initialProfileData: Partial<User>;
  submissionCount: number;
  questionCount: number;
  children: React.ReactNode;
}) => {
  const [profileData, setProfileData] = useState(
    initialProfileData ? { ...initialProfileData } : blankProfileData
  );

  const [greetingBannerData, setGreetingBannerData] = useState({
    submissionCount: submissionCount || 0,
    questionCount: questionCount || 0,
  });

  const [isEditable, setIsEditable] = useState(false);

  return (
    <DashBoardContext.Provider
      value={{
        isEditable,
        profileData,
        greetingBannerData,
        setIsEditable,
        setProfileData,
        setGreetingBannerData,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

export function useDashBoard() {
  return useContext(DashBoardContext);
}
