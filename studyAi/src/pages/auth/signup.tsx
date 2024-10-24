import AuthPage from "@/auth/providers/authPageWrapper";
import MetadataHead from "@/auth/metadata/MetadataHead";
const metadata = {
  title: "Join us - Study AI",
  description: "Create your account, and start your educational journey today",
};
export default function SignUpPage() {
  return (
    <>
      <MetadataHead {...metadata} />
      <AuthPage type="signup" />
    </>
  );
}
