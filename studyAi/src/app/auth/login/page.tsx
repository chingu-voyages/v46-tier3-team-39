import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";

export default async function LoginPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="login" />;
}
