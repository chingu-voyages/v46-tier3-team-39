import MetadataHead from "@/authComponents/metadata/MetadataHead";
import AuthPage from "../../authComponents/providers/authPageWrapper";
const metadata = {
  title: "Login - Study AI",
  description: "Welcome back! Login to start your educational journey",
};
export default function LoginPage() {
  return (
    <>
      <MetadataHead {...metadata} />
      <AuthPage type="login" />
    </>
  );
}
