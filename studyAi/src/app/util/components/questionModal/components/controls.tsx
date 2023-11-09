import { Question } from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { QuestionProps } from "../questionEditModal";
import { SetStateAction, useState } from "react";
import { gql } from "../../../../../../graphql/generated";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";
import Switch from '@mui/material/Switch';
import { colors } from "@mui/material";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const generateQuestion = async (
  questionData: Partial<Question>,
  isLoading: string,
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>
  ) => {
  if (!questionData) return;
  if (isLoading === "loading") return;
  try {
    const questionProvided = { 
        type: questionData.questionType,
        tags: questionData.tags,
        question: questionData.questionInfo?.description,
        numberOfOptions: questionData.questionInfo?.options.length
      }
      const result = await axios({
        url: "/api/generateQuestion",
        method: "POST",
        data: questionProvided,
    });
    setQuestionData((prev) => ({
      ...prev,
      questionInfo: {
        title: prev?.questionInfo?.title || "",
        description: result?.data?.newQuestion?.question || "",
        options: result?.data?.newQuestion?.incorrect || [""]
      },
      answer: {
        correctAnswer: result?.data?.newQuestion?.correct || [""]
      }}));
  } catch (err) {
    console.error(err);
    return null;
  }
}

const AddQuestion = gql(`
  mutation CreateOneQuestionResolver(
    $creatorId: String,
    $questionType: String,
    $tags: [String],
    $questionInfo: {
      title: String,
      descriptin: String,
      options: [String]
    },
    $answer: {
      correctAnswer: [string]
    },
    $likeCounter: {
      likes: Int,
      dislikes: Int
    },
    $private: boolean
  ){
    createOneQuestion(
      data: {
        creatorId: $creatorId,
        questionType: $questionType,
        tags: $tags,
        questionInfo: $questionInfoData,
        answer: $answerData,
        likeCounter: $likeCounter,
        private: $private
      })
    {
      id
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

const uploadQuestion = async (creatorId: string, questionData: Partial<Question>) => {

    const [mutationQuery, { loading, error, data }] = useMutation(
      AddQuestion,
      {
        variables: {
          creatorId,
          likeCounter: {
            likes: 0,
            dislikes: 0
          },
          ...questionData,
        },
      }
    );
}

const Controls = ({
  closeHandler,
  setQuestionData,
  questionData
}: QuestionProps) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [isLoading, setIsLoading] = useState("success");


  // METHOD 2
  /* const session = useSession()
  const creatorId = session?.data?.user.id;
  const [mutationQuery, { loading, error, data }] = useMutation(
    AddQuestion,
    {
      variables: {
        creatorId,
        likeCounter: {
          likes: 0,
          dislikes: 0
        },
        ...questionData
        // questionType: "checkbox",
        // tags: ["maths"],
        // questionInfo: {
        //   title: "Maths",
        //   descriptin: "What is 1+1?",
        //   options: ["5"]
        // },
        // answer: {
        //   correctAnswer: ["2"]
        // },
        // private: false
      },
    }
  ); */

  const uploadClickHandler = () => {
    /* e.preventDefault();
    if (!questionData) return;
    if (isLoading === "loading") return;
    mutationQuery();
    await uploadQuestion(creatorId || "", questionData); */
    
    console.log(questionData)
  }

    return (
      <div className={styles.layout}>
        <div className={styles.topButtonsLayout}>
          <button className={styles.button({})}
          onClick={uploadClickHandler}>
            Upload Question
            </button>
          <button
            className={styles.button({})}
            onClick={() => generateQuestion(questionData || {}, isLoading, setQuestionData)}
          >
            Generate With AI
          </button>
        </div>
        <div>
          <div style={{color: 'black'}}>Private</div>
          <Switch
            onChange={() => {setQuestionData((prev) => ({...prev, private: !prev?.private}))}} defaultChecked/>
        </div>
        <button
          className={styles.button({ isCancel: true })}
          onClick={closeHandler}
        >
          Cancel
        </button>
      </div>
    );
  }


export default Controls;
