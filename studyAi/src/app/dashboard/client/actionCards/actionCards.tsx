"use client";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import Link from "next/link";
import { useDashBoard } from "../../context/DashboardContext";

const ActionCard = ({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  link: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={link}
      className="border flex flex-col min-h-[10rem] items-center justify-center p-6"
    >
      <div className="flex items-center w-full">
        <div className="">{icon}</div>
        <div className="font-bold text-lg ml-2">{title}</div>
      </div>
      <div className="pt-2 text-sm">{description}</div>
    </Link>
  );
};
const ActionCards = () => {
  const dashboardContext = useDashBoard();
  if (!dashboardContext) return <></>;
  const { profileData } = dashboardContext;
  return (
    <div className="flex flex-col justify-between item-center space-y-5 xs:space-y-0 xs:space-x-5 md:space-x-6 xs:flex-row">
      <ActionCard
        icon={<AutoAwesomeIcon className={"text-2xl"} />}
        title="Create Questions"
        description="Create exam questions using AI! Use another community question as a template, or upload your own!"
        link={`/library/question/create`}
      />
      <ActionCard
        icon={<QuestionAnswerOutlinedIcon className={"text-2xl"} />}
        title="Your Questions"
        description="Choose exams from our community, or create your own variations using any questions you generate or find!"
        link={`/library/${profileData.id}/questions`}
      />
    </div>
  );
};
export default ActionCards;
