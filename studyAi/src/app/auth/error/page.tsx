import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
import AuthPage from "../components/authPageWrapper";
import { redirect } from "next/navigation";
function getErrorMessage(errorCode: string) {
  let errorMessage;
  switch (errorCode) {
    case "CredentialsSignin":
      errorMessage = "Invalid email or password.";
      break;
    case "OAuthCreateAccount":
      errorMessage =
        "There was an error creating your account with this provider (i.e Google, Github, etc)";
      break;
    case "OAuthAccountNotLinked":
      errorMessage =
        "This account is not linked with this provider (i.e Google, Github, etc). Login to your account another way, and link this provider";
    case "EmailSignin":
      errorMessage = "The email you provided is not registered.";
      break;
    case "AccountNotLinked":
      errorMessage = "This account is not linked with any provider.";
      break;
    case "OAuthSignin":
      errorMessage = "There was an error with the OAuth provider.";
      break;
    default:
      errorMessage = "An unknown error occurred.";
  }
  return errorMessage;
}

const determineErrorMessageArr = (err: string | string[]) => {
  if (typeof err === "string")
    return [
      {
        code: err,
        message: getErrorMessage(err),
      },
    ];
  return err.map((e) => ({
    code: e,
    message: getErrorMessage(e),
  }));
};
export default async function ErrorPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await redirectIfLoggedIn("/dashboard");
  const error = searchParams.error;
  if (!error) redirect("/auth/login");
  const errorMessageArr = determineErrorMessageArr(error);
  return <AuthPage type="login" errMessageArr={errorMessageArr} />;
}
