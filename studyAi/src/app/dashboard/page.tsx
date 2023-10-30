import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import QuestionModal from "../util/components/questionModal/Modal";
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
      <QuestionModal />
    </NavigationWrapper>
  );
}
