"use client";
import useElementPosition from "@/app/util/hooks/useElementSize";
import { AuthImg } from "../server/authImg";
import useWindowWidth from "@/app/util/hooks/useWindowWidth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useOriginContext } from "@/app/util/providers/originProvider";
import LoadingIcon from "@/app/util/icons/loadingIcon";
const AuthPageWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const sessionData = useSession();
  const authenticated = sessionData.status === "authenticated";
  const isWithinPage = useOriginContext();
  useEffect(() => {
    if (!authenticated) return;
    try {
      if (isWithinPage) router.back();
      else router.push("/dashboard");
    } catch (e) {
      console.error(e);
      router.push("/dashboard");
    }
  }, [authenticated, router, isWithinPage]);
  const windowWidth = useWindowWidth();
  const {
    setRef,
    position: { height: elementHeight },
  } = useElementPosition();
  const imgStyles = {
    height: elementHeight + "px",
  };
  //page must be empty if authenticated, as the hooks will trigger a re-direct
  if (authenticated) return <LoadingIcon entireViewPort strokeWidth={'1rem'} />;
  return (
    <div
      ref={setRef}
      className="bg-White w-full min-h-screen flex flex-col items-center md:justify-center md:flex-row"
    >
      <AuthImg
        containerClassNames="flex h-60 md:hidden"
        style={windowWidth > 768 ? imgStyles : undefined}
      ></AuthImg>
      {children}
      <AuthImg
        containerClassNames="h-full grow hidden md:flex md:min-h-screen md:w-3/6"
        style={windowWidth > 768 ? imgStyles : undefined}
      ></AuthImg>
    </div>
  );
};
export default AuthPageWrapper;
