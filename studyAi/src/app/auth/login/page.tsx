import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
import { Metadata } from "next";
import determineOriginUrl from "@/app/util/parsers/determineOriginUrl";

export default async function LoginPage() {
  const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="login" />;
}
export async function generateMetadata(): Promise<Metadata> {
  const title = "Login - Study AI";
  const description = "Welcome back! Login to start your educational journey";
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