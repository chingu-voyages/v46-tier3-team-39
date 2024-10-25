import React from "react";
import NavigationWrapper from "../../../frontend/utils/components/navigation/navigationWrapper";

export default async function Terms() {
  return (
    <>
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      ></NavigationWrapper>
    </>
  );
}
