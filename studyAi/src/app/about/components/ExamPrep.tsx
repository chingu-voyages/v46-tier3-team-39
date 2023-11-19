import { options } from "@/authComponents/nextAuth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { Button } from "@mui/material";
const ExamPrep = async () => {
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
          <Button
            variant="contained"
            className="text-White bg-Black py-3 px-6 rounded-none"
            href={"/library/question/create"}
            LinkComponent={Link}
            sx={{
              textTransform: "unset",
            }}
          >
            Try
          </Button>
          <button className="border py-3 px-6">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;
