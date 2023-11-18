// import { redirectIfLoggedIn } from "@/app/api/utils/sessionFuncs";
// import AuthPage from "../providers/authPageWrapper";
// import { redirect } from "next/navigation";
export function getErrorMessage(errorCode: string) {
  let errorMessage;
  switch (errorCode) {
    case "CredentialsSignin":
      errorMessage = "Invalid credentials, please try again";
      break;
    case "OAuthCreateAccount":
      errorMessage = "An error occured. Please try again";
      break;
    case "OAuthAccountNotLinked":
      errorMessage = "Invalid credentials, please try again";
      break;
    case "EmailSignin":
      errorMessage = "This account does not exist";
      break;
    case "AccountNotLinked":
      errorMessage = "An error occured, please try again";
      break;
    case "OAuthSignin":
      errorMessage = "Invalid sign in, please try again.";
      break;
    default:
      errorMessage = "An error occurred, please try agin";
  }
  return errorMessage;
}

export const determineErrorMessageArr = (err: string | string[]) => {
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
// export default async function ErrorPage(
// //   {
// //   params,
// //   searchParams,
// // }: {
// //   params?: { slug: string };
// //   searchParams?: { [key: string]: string | string[] | undefined };
// // }
// ) {
//   return <>hello</>;
//   // const session = await redirectIfLoggedIn("/dashboard");
//   // const error = searchParams.error;
//   // if (!error) redirect("/auth/login");
//   // const errorMessageArr = determineErrorMessageArr(error);
//   // return <AuthPage type="login" errMessageArr={errorMessageArr} />;
// }
