import { getServerSession } from "next-auth";
import CubeIcon from "./client/cubeIcon";
import { options } from "@/authComponents/nextAuth/options";
import Link from "next/link";

const Process = async () => {
  const session = await getServerSession(options);

  return (
    <div className="text-center py-16 px-5 sm:py-28 sm:px-16">
      <h4 className="sm:text-3xl font-semibold">Why use AI?</h4>
      <h1 className="text-6xl sm:text-11xl font-bold my-1 sm:my-3 leading-tight">
        Understanding the Process
      </h1>
      <h4 className="sm:text-5xl leading-loose sm:leading-normal mt-6">
        Dive into generating novel practice questions and creating better exam
        results!
      </h4>
      <div className="sm:flex justify-between mt-8 sm:mt-12 text-left">
        <div className="sm:w-1/3 max-w-md mx-auto bg-gray-200 p-5 border-2">
          <CubeIcon size="xl" />
          <h1 className="text-3xl sm:text-5xl font-bold my-4">How It Works</h1>
          <p>Discover how novel questions are created!</p>
          <button className="mt-2">
            Learn more <CubeIcon />
          </button>
        </div>
        <div className="sm:w-1/3 max-w-md mx-auto my-2 sm:my-0 sm:mx-2 bg-gray-200 p-5 border-2">
          <CubeIcon size="xl" />
          <h1 className="text-3xl sm:text-5xl font-bold my-4">Why It Works</h1>
          <p>Discover the power of AI technology</p>
          <button className="mt-2">
            Learn more <CubeIcon />
          </button>
        </div>
        {!session && (
          <div className="sm:w-1/3 max-w-md mx-auto bg-gray-200 p-5 border-2">
            <CubeIcon size="xl" />
            <h1 className="text-3xl sm:text-5xl font-bold my-4">Join us</h1>
            <p>Contribute and use our endlessly growing technology</p>
            <Link href={"/auth/signup"}>
              <button className="border-2 py-3 px-6 sm:px-8 sm:py-4">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Process;
