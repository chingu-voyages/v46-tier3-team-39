import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
import { generateMetadataProps } from "@/app/util/metadata/generateMetadataProps";
export default async function SignUpPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="signup" />;
}
export const generateMetadata = generateMetadataProps({
  title: "Join us - Study AI",
  description: "Create your account, and start your educational journey today",
});
