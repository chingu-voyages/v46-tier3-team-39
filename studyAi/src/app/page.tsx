import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap items-center justify-between p-24">
      <Link href={"/about"}>About</Link>
      <Link href={"/auth/login"}>Login</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
      <Link href={"/dashboard"}>Dashboard</Link>
      <Link href={"/dashboard/exams"}>Exams Library</Link>
      <Link href={"/dashboard/questions"}>Questions Library</Link>
      <Link href={"/library/question"}>Questions Page</Link>
      <Link href={"/library/exam"}>Exam Page</Link>
    </main>
  );
}
