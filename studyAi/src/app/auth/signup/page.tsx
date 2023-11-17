import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
import { Metadata } from "next";
import determineOriginUrl from "@/app/util/parsers/determineOriginUrl";
export default async function SignUpPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="signup" />;
}
export async function generateMetadata(): Promise<Metadata> {
  const title = "Join us - Study AI";
  const description =
    "Create your account, and start your educational journey today";
  const origin = determineOriginUrl() as string;
  return {
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      locale: "en_US",
      type: "website",
      siteName: "Study AI",
      url: origin,
      images: [
        {
          url: "/logo/logo.png",
          width: 800,
          height: 800,
        },
      ],
    },
  };
}
