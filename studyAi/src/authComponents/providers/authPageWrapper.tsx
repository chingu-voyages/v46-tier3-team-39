import AppLogo from "../../app/util/components/logo/server/responsiveLogo";
import NextLink from "next/link";
import { AuthForm } from "../client/authForm";
import AuthPageWrapper from "../client/authWrapper";
import { useRouter } from "next/router";
import { determineErrorMessageArr } from "../nextAuth/errors";
export const AuthHeader = ({ type }: { type: "login" | "signup" }) => {
  const header = type === "login" ? "Sign In" : "Join us";
  const subheader =
    type === "login" ? "Welcome back!" : "Start your test preparation today!";
  return (
    <header className="flex flex-col justify-center items-center space-y-4 w-full mt-2 mb-4 md:my-4">
      <h3 className="text-Black font-semibold tracking-tight text-6xl w-full flex justify-center">
        {header}
      </h3>
      <h6 className="text-Black tracking-tight text-base w-full flex justify-center">
        {subheader}
      </h6>
    </header>
  );
};

export const AuthPage = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const { query } = router;
  const errMessageArr = query.error
    ? determineErrorMessageArr(query.error)
    : [];
  const bottomText =
    type === "login" ? "Don't have an account?" : "Already have an account?";
  return (
    <AuthPageWrapper>
      <div className="flex flex-col justify-center items-center w-full h-full px-5 pt-10 pb-12 md:w-3/6 md:p-10">
        <AppLogo />
        <AuthHeader type={type} />
        <AuthForm type={type} errMessageArr={errMessageArr} />
        <span className="text-Black text-sm flex justify-center items-center tracking-tight mt-4">
          {bottomText}
          <NextLink
            className="ml-2 text-Black underline"
            href={type === "login" ? "/auth/signup" : "/auth/login"}
          >
            {type === "login" ? "Sign Up" : "Sign In"}
          </NextLink>
        </span>
      </div>
    </AuthPageWrapper>
  );
};
export default AuthPage;
