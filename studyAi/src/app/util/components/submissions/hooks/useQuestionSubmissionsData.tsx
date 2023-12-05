import { calculateTimeData } from "@/app/library/question/components/time/server/calculateTimeData";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { QuestionSubmission } from "@prisma/client";
const useQuestionSubmissionsData = (props: Partial<QuestionSubmission>) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480;
  const { dateCreated, time, score } = props;
  const { actualScore, maxScore } = score || {};
  //calculate score data
  const scoreExists =
    typeof actualScore === "number" && typeof maxScore === "number";
  const currScore = scoreExists ? actualScore / maxScore : 0;
  const normalizedScore = scoreExists
    ? (currScore * 100).toFixed(2) + "%"
    : "N/A";
  //calculate time data
  const { timeType, timeTaken, totalTimeGiven } = time || {};
  const { normalizedTimeTaken } = calculateTimeData({
    timeType,
    timeTaken,
    totalTimeGiven,
  });
  const normalizedDateCreated = dateCreated
    ? new Date(dateCreated).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";
  return {
    windowWidth,
    isMobile,
    normalizedScore,
    normalizedTimeTaken,
    normalizedDateCreated,
    timeType: timeType || "stopwatch",
  };
};
export default useQuestionSubmissionsData;
