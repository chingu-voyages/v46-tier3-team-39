import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
export default async function DashboardPage() {
  const sessionData = await protectRouteSSR("/auth/login");
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      {" "}
      Hello
    </NavigationWrapper>
  );
}
