import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
const Hero = async () => {
  const session = await getServerSession(options);
  return (
    /* url for hero background goes in bg-[url(')] */
    <div className="w-full py-16 px-5 sm:py-24 sm:px-16 text-center text-White bg-[url('/AI.jpeg')] bg-no-repeat bg-center bg-cover sm:bg-[url('/AI.jpeg')]">
      <p className="text-xl my-6">Innovative</p>
      <h1 className="text-7xl sm:text-9.75xl font-bold">
        Preparing You Better
      </h1>
      <p className="text-lg sm:text-1xl my-2 font-light">
        Learn more about our story and mission.
      </p>
      <div className="flex m-auto my-6 justify-center">
        <Link 
          href={"#video"}
          className="bg-Black py-3 px-6 sm:px-7 sm:py-3 mx-2 sm:text-0.75xl"
          data-testid="learn-more-button"
          >
            Learn More
        </Link>
        <Link
          href={session ? "/dashboard" : "/auth/signup"}
          className="border-2 py-3 px-6 sm:px-6 sm:py-2.5 sm:text-0.75xl"
          data-testid="sign-up-button"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
