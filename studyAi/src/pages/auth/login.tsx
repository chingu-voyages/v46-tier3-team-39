import MetadataHead from "@/auth/metadata/MetadataHead";
import AuthPage from "@/auth/providers/authPageWrapper";
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
