import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
export default async function SignUpPage() {
    const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="signup" />;
}
