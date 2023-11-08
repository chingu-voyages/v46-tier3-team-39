import { Question } from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { QuestionProps } from "../questionEditModal";
import { useState } from "react";

const generateQuestion = async (questionData: Partial<Question>) => {
  try {
    const questionInfo = { 
        type: questionData.questionType,
        tags: questionData.tags,
        question: questionData.questionInfo?.description,
        numberOfOptions: questionData.questionInfo?.options.length
    }
    const result = await axios({
      url: "/api/generateQuestion",
      method: "POST",
      data: questionInfo,
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const styles = {
  layout: [
    "mx-auto",
    "mt-4",
    "sm:flex",
    "sm:items-center",
    "sm:w-[640px]",
  ].join(" "),
  topButtonsLayout: [
    "flex",
    "justify-between",
    "w-11/12",
    "mx-auto",
    "max-w-[400px]",
    "sm:w-[400px]",
  ].join(" "),
  button: ({ isCancel = false }) =>
    [
      "p-3",
      "h-fit",
      "block",
      "text-White",
      "text-sm",
      "rounded-2xl",
      "whitespace-nowrap",
      isCancel ? "bg-light-error" : "bg-light-on-secondary-container",
      isCancel ? "mx-auto my-4" : "",
      "sm:text-lg",
    ].join(" "),
};

const Controls = ({
  setIsOpen,
  setQuestionData,
  questionData
}: QuestionProps) => {
  const [isLoading, setIsLoading] = useState("success");
  return (
    <div className={styles.layout}>
      <div className={styles.topButtonsLayout}>
        <button className={styles.button({})}>Upload Question</button>
        <button
          className={styles.button({})}
          onClick={async () => {
            if (!questionData) return;
            if (isLoading === "loading") return;
            const result = await generateQuestion(questionData);
            setQuestionData((prev) => { return {...prev, question: result.newQuestion.question, options: [...result.newQuestion.correct, ...result.newQuestion.incorrect]}});
          }}
        >
          Generate With Ai
        </button>
      </div>
      <button
        className={styles.button({ isCancel: true })}
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default Controls;
