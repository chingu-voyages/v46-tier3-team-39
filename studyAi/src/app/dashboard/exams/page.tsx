import { protectRouteSSR } from "../../api/utils/sessionFuncs";
import NavigationWrapper from "../../util/components/navigation/navigationWrapper";
import YourExam from "../../util/components/examList/List";
export default function ExamListPage() {
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      {" "}
      
      <div className="padding-right: 10px;">
        Your Exams
      </div>
      <YourExam />
    </NavigationWrapper>
  );
}
