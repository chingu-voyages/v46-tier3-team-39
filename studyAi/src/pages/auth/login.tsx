// import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../../authComponents/providers/authPageWrapper";
// import { generateMetadataProps } from "@/app/util/metadata/generateMetadataProps";
export default function LoginPage() {
  //     {
  //   params,
  //   searchParams,
  // }: {
  //   params?: { slug: string };
  //   searchParams?: { [key: string]: string | string[] | undefined };
  // }
  // const session = await redirectIfLoggedIn("/dashboard");
  return <AuthPage type="login" />;
}
// export const generateMetadata = generateMetadataProps({
//   title: "Login - Study AI",
//   description: "Welcome back! Login to start your educational journey",
// });
