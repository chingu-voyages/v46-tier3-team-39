import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
export default async function SignUpPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  console.log(session);
  return <AuthPage type="signup" />;
}
