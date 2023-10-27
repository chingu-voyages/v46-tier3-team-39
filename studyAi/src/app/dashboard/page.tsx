import { protectRouteSSR } from "../api/utils/sessionFuncs";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import QuestionEditor from "../util/components/questionEditor/Editor";
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
      <QuestionEditor />
    </NavigationWrapper>
  );
}
