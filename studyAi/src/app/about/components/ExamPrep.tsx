import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
const ExamPrep = async () => {
  const session = await getServerSession(options);

  return (
    <div className="sm:flex justify-between items-center py-16 px-5 sm:py-28 sm:px-16 text-center sm:text-left">
      <div>
        <h1 className="text-5xl sm:text-7xl font-bold">
          Experience our innovative exam prep
        </h1>
        <h2 className="sm:text-xl mt-4">
          Unlock your full potential with our AI-powered practice questions
        </h2>
      </div>
      <div className="flex mt-4">
        <div className="mx-auto">
          <Link href={session ? "/library/question/create" : "/auth/signup"}>
            {session ? (
              <QuestionModalWrapper>
                {(props) => (
                  <button
                    className="bg-Black border text-White py-3 px-6 mr-4"
                    onClick={props.onClick}
                  >
                    Try
                  </button>
                )}
              </QuestionModalWrapper>
            ) : (
              <button className="border-2 py-3 px-6 sm:px-8 sm:py-4">
                Sign Up
              </button>
            )}
          </Link>

          <button className="border py-3 px-6">learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;
