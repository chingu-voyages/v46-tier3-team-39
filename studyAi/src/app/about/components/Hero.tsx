import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { ObjectId } from "bson";

export default function Hero() {
  const correctAnswer = { id: new ObjectId().toString(), value: "2" }
  return (
    /* url for hero background goes in bg-[url(')] */
    <div className="w-full py-16 px-5 sm:py-28 sm:px-16 text-center text-White bg-[url('/placeholderImages/heroMobile.png')] bg-no-repeat bg-center bg-cover sm:bg-[url('/placeholderImages/heroDesktop.png')]">
      <p className="text-xl my-6">Innovative</p>
      <h1 className="text-7xl sm:text-11xl font-bold">Preparing You Better</h1>
      <p className="text-lg sm:text-3xl my-2 font-light">
        Learn more about our story and mission.
      </p>
      <div className="flex m-auto my-6 justify-center">
          <button className="bg-Black py-3 px-6 sm:px-8 sm:py-4 mx-2">
            Learn More
          </button>
        <button className="border-2 py-3 px-6 sm:px-8 sm:py-4">Sign Up</button>
      </div>
    </div>
  );
}
