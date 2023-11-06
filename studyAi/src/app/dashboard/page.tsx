import React from "react";
import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import GreetingBannerContainer from "./server/greetingBannerContainer";
import Profile from "./server/profile";
import Blah from "./blah";

export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");

  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
      usePadding
    >
      {/* <Blah />
      <Profile /> */}
      <GreetingBannerContainer />
      {/* <QuestionEditor /> */}
    </NavigationWrapper>
  );
}
