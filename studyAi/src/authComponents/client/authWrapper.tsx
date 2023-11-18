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
  const windowWidth = useWindowWidth();
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
  const {
    setRef,
    position: { height: elementHeight },
  } = useElementPosition();
  const imgStyles = {
    height: elementHeight + "px",
  };
  //page must be empty if authenticated, as the hooks will trigger a re-direct
  if (authenticated) return <LoadingIcon entireViewPort strokeWidth={"1rem"} />;
  return (
    <div
      ref={setRef}
      className="bg-White w-full min-h-screen flex flex-col items-center md:justify-center md:flex-row"
    >
      {windowWidth <= 768 && (
        <AuthImg
          containerClassNames="flex h-60 w-full"
          style={windowWidth > 768 ? imgStyles : undefined}
        />
      )}
      {children}
      {windowWidth > 768 && (
        <AuthImg
          containerClassNames="h-full grow flex min-h-screen w-3/6"
          style={windowWidth > 768 ? imgStyles : undefined}
        />
      )}
    </div>
  );
};
export default AuthPageWrapper;
