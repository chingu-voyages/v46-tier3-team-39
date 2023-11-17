import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
import { generateMetadataProps } from "@/app/util/metadata/generateMetadataProps";
export default async function LoginPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="login" />;
}
export const generateMetadata = generateMetadataProps({
  title: "Login - Study AI",
  description: "Welcome back! Login to start your educational journey",
});
