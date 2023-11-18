"use client";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { useRouter } from "next/navigation";
const QuestionCreatePage = () => {
  const router = useRouter();
  return (
    <div className="max-w-screen-xl flex items-center justify-center grow h-full bg-White w-full">
      <QuestionModalWrapper
        type={{
          type: "create",
          layout: "page",
        }}
        onSave={(question) => {
          if (question.id) router.push(`/library/question/${question.id}`);
        }}
      >
        <></>
      </QuestionModalWrapper>
    </div>
  );
};
export default QuestionCreatePage;
