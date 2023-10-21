import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";

export default async function ErrorPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await redirectIfLoggedIn("/dashboard");
  const error = searchParams.error;
  return <AuthPage type="login" />;
}
