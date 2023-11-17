"use client";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { useRouter } from "next/navigation";
const QuestionCreatePage = () => {
  const router = useRouter();
  return (
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
  );
};
export default QuestionCreatePage