import Link from "next/link";
import NavigationWrapper from "./util/components/navigation/navigationWrapper";
export default function Home() {
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      <Link href={"/about"}>About</Link>
      <Link href={"/auth/login"}>Login</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
      <Link href={"/dashboard"}>Dashboard</Link>
      <Link href={"/dashboard/exams"}>Exams Library</Link>
      <Link href={"/dashboard/questions"}>Questions Library</Link>
      <Link href={"/library/question/65429fd993f2d4403eac75ec"}>
        Questions Page
      </Link>
      <Link href={"/library/exam"}>Exam Page</Link>
    </NavigationWrapper>
  );
}
