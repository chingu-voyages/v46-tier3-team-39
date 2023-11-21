import { BsStars } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import GreetingBannerContainer from "../server/greetingBannerContainer";
import Link from "next/link";
import { useDashBoard } from "../context/DashboardContext";

const GreetingBannerWrapper = () => {
  const { profileData } = useDashBoard();

  return (
    <div className="col-span-2">
      <div className="grid grid-rows-2 ">
        <div className="row-span-1 border p-5 flex w-full">
          <GreetingBannerContainer />
        </div>
        <div className=" row-span-1 flex item-center py-5">
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link href={`/library/question/create`}>
              <div className=" col-span-1 border p-5 flex flex-col lg:flex-row h-full items-center">
                <div className="me-2 ">
                  <BsStars size={34} />
                </div>
                <div className="flex flex-col">
                  <div className=" font-bold text-xl">Generate Questions</div>
                  <div>
                    Create exam questions using AI ! Use another community
                    question as a template, or upload your own !
                  </div>
                </div>
              </div>
            </Link>
            <Link href={`/library/${profileData.id}/questions`}>
              <div className=" col-span-1 border p-5 h-full flex flex-col lg:flex-row items-center">
                <div className="me-2 ">
                  <FaFileCircleQuestion size={34} />
                </div>
                <div className="flex flex-col">
                  <div className=" font-bold text-xl ">Your Questions</div>
                  <div>
                    Choose exams from our community, or create your own
                    variations using any questions you generate or find!
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingBannerWrapper;
