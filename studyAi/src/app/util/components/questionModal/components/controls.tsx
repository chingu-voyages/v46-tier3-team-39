"use client";
import {
  AnswerOption,
  Question,
} from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { SetStateAction, useState } from "react";
import Switch from "@mui/material/Switch";
import { v4 as uuid } from "uuid";
import { IconButton } from "@mui/material";
import { Stars } from "@/app/util/icons/stars";
import { useQuestionModal } from "../context/questionModalProvider";
const generateQuestion = async (
  questionData: Partial<Question>,
  isLoading: boolean,
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>
) => {
  if (!questionData) return;
  if (isLoading) return;
  try {
    const questionProvided = {
      type: questionData.questionType,
      tags: questionData.tags,
      title: [questionData.questionInfo?.title],
      question: questionData.questionInfo?.description,
      numberOfOptions: questionData.questionInfo?.options.length,
      answers: questionData.questionInfo?.options,
    };
    const result = await axios({
      url: "/api/generateQuestion",
      method: "POST",
      data: questionProvided,
    });
    let newAnswers: AnswerOption[] = [];
    const newOptions = result?.data?.newQuestion?.options.map(
      (option: string) => {
        const newOption = { id: uuid(), value: option };
        if (result?.data?.newQuestion?.answer.includes(option)) {
          newAnswers.push(newOption);
        }
        return newOption;
      }
    );
    setQuestionData((prev) => ({
      ...prev,
      questionInfo: {
        title: prev?.questionInfo?.title || "",
        description: result?.data?.newQuestion?.description || "",
        options: newOptions || [],
      },
      answer: {
        correctAnswer: newAnswers || [],
      },
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Controls = () => {
  const modalData = useQuestionModal();
  const [isLoading, setIsLoading] = useState(true);
  if (!modalData) return <></>;
  const { questionData, setQuestionData, currElPos } = modalData;
  return (
    <div className="flex items-stretch justify-end space-x-3">
      <div className="flex items-center h-10 ">
        <IconButton
          type="button"
          // className={styles.button({})}
          onClick={async () => {
            try {
              setIsLoading(true);
              await generateQuestion(
                questionData || {},
                isLoading,
                setQuestionData
              );
            } catch (err) {
              setIsLoading(false);
            }
          }}
          className={"aspect-square p-2 h-full"}
        >
          <Stars svg={{ className: "h-full w-full" }} />
        </IconButton>
      </div>
      <div className="flex items-center">
        <div className="w-[1px] h-4/6 bg-Black" />
      </div>
      <div className="flex items-center justify-center">
        <label
          htmlFor="question-access-rights-input"
          className={
            currElPos && currElPos.position.width > 640
              ? "text-base"
              : "text-sm"
          }
          style={{ color: "black" }}
        >
          Private
        </label>
        <Switch
          id={"question-access-rights-input"}
          name="question-access-rights-input"
          size={
            currElPos && currElPos.position.width > 640 ? "medium" : "small"
          }
          onChange={() => {
            setQuestionData((prev) => ({ ...prev, private: !prev?.private }));
          }}
          defaultChecked
        />
      </div>
    </div>
  );
};

export default Controls;
