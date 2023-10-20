"use client";

import AuthPage from "../components/authPageWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const session = useSession();
  const router = useRouter();
  // --- Check if the user is logged In ---
  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("./");
  //   }
  // }, [session]);

  if (session) {
    console.log('session', session);
  }
  console.log('no session');
  return <AuthPage type="login"/>;
}
