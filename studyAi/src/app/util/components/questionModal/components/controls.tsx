import {
  AnswerOption,
  Question,
} from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { QuestionProps } from "../questionEditModal";
import { SetStateAction, useState } from "react";
import { gql } from "../../../../../../graphql/generated";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import Switch from "@mui/material/Switch";
import ObjectId from "bson-objectid";

const generateQuestion = async (
  questionData: Partial<Question>,
  setIsGenerating: React.Dispatch<SetStateAction<boolean>>,
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>
) => {
  setIsGenerating(true);
  if (!questionData) return;
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
  } catch (err) {
    console.error(err);
    return null;
  }
  setIsGenerating(false);
};

const AddQuestion = gql(`
  mutation CreateOneQuestionResolver(
    $creatorId: String!,
    $questionType: String!,
    $tags: QuestionCreatetagsInput,
    $questionInfo: QuestionInfoDataCreateEnvelopeInput!,
    $answer: AnswerDataCreateEnvelopeInput!,
    $likeCounter: LikeCounterCreateEnvelopeInput!,
    $private: Boolean!
  ){
    createOneQuestion(
      data: {
        creatorId: $creatorId,
        questionType: $questionType,
        tags: $tags,
        questionInfo: $questionInfo,
        answer: $answer,
        likeCounter: $likeCounter,
        private: $private
      }
      )
    {
      id
    }
  }
`);

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

const uploadQuestion = (mutationQuery: any, e: any) => {
  e.preventDefault();
  mutationQuery();
};

const Controls = ({
  closeHandler,
  setQuestionData,
  questionData,
}: QuestionProps) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [isGenerating, setIsGenerating] = useState(false);
  const session = useSession();
  const creatorId = session?.data?.user.id;
  const variables = {
    questionType: questionData?.questionType
      ? questionData.questionType
      : "Short Answer",
    tags: {
      set: questionData?.tags ? questionData.tags : [],
    },
    questionInfo: {
      set: questionData?.questionInfo
        ? {
            ...questionData.questionInfo,
          }
        : {
            title: "",
            description: "",
            options: [],
          },
    },
    creatorId: creatorId ? creatorId : "",
    likeCounter: {
      set: {
        likes: 0,
        dislikes: 0,
      },
    },
    answer: {
      set: {
        correctAnswer: questionData?.answer?.correctAnswer
          ? questionData?.answer?.correctAnswer
          : [],
      },
    },
    private: !!questionData?.private,
  };
  const [mutationQuery, { loading, error, data }] = useMutation(AddQuestion, {
    variables,
  });

  return (
    <div className={styles.layout}>
      <div className={styles.topButtonsLayout}>
        <button
          className={styles.button({})}
          onClick={(e) => uploadQuestion(mutationQuery, e)}
          disabled={loading || isGenerating}
        >
          {loading ? "Uploading..........." : "Upload Question"}
        </button>
        <button
          className={styles.button({})}
          onClick={() =>
            generateQuestion(
              questionData || {},
              setIsGenerating,
              setQuestionData
            )
          }
          disabled={isGenerating || loading}
        >
          {isGenerating ? "Generating.........." : "Generate With AI"}
        </button>
      </div>
      <div>
        <div style={{ color: "black" }}>Private</div>
        <Switch
          onChange={() => {
            setQuestionData((prev) => ({ ...prev, private: !prev?.private }));
          }}
          defaultChecked
        />
      </div>
      <button
        className={styles.button({ isCancel: true })}
        onClick={closeHandler}
      >
        Cancel
      </button>
    </div>
  );
};

export default Controls;
