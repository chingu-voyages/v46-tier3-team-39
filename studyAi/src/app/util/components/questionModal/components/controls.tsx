"use client";
import {
  AnswerOption,
  Question,
} from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { SetStateAction } from "react";
import Switch from "@mui/material/Switch";
import ObjectId from "bson-objectid";
import { IconButton } from "@mui/material";
import { Stars } from "@/app/util/icons/stars";
import { useQuestionModal } from "../context/questionModalProvider";
import BtnLabelDropdown from "../../btnLabelDropdown/btnLabelDropdown";

const generateQuestion = async ({
  questionData,
  setQuestionData,
}: {
  questionData: Partial<Question>;
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>;
}) => {
  if (!questionData) return;
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
      const newOption = { id: ObjectId().toString(), value: option };
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
};

const Controls = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const {
    questionData,
    setQuestionData,
    currElPos,
    isGenerating,
    setIsGenerating,
  } = modalData;
  return (
    <div className="flex items-stretch justify-end space-x-3">
      <div className="flex items-center h-10 ">
        <BtnLabelDropdown text="Generate With AI" pointerEvents={false}>
          {(props) => (
            <IconButton
              ref={props.setAnchorEl}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") props.handleClick(e);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") props.handleClose();
              }}
              type="button"
              onClick={async () => {
                setIsGenerating(true);
                try {
                  if (isGenerating) return;
                  setIsGenerating(true);
                  //scroll to start
                  currElPos?.elementRef?.scrollTo(0, 0);
                  await generateQuestion({
                    questionData: questionData || {},
                    setQuestionData,
                  });
                } catch (err) {
                  console.error(err);
                }
                setIsGenerating(false);
              }}
              className={"aspect-square p-2 h-full"}
              disabled={isGenerating}
            >
              <Stars svg={{ className: "h-full w-full" }} />
            </IconButton>
          )}
        </BtnLabelDropdown>
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
