import { Question } from "../../../../../../prisma/generated/type-graphql";
import axios from "axios";
import { QuestionProps } from "../questionEditModal";
import { useState } from "react";
import { gql } from "../../../../../../graphql/generated";
import { useSession } from "next-auth/react";
import ServerGraphQLClient from "@/app/api/graphql/apolloServerClient";


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

/*
  creatorId    String           @db.ObjectId
  questionType String
  tags         String[]
  questionInfo 
    title       String
    description String
    options     String[]
  correctAnswer String[]
  likeCounter
    likes    Int
    dislikes Int
  private Boolean
*/

const AddQuestion = gql(`
  mutation CreateOneQuestionResolver(
    $creatorId: string,
    $questionType: string,
    $tags: [string],
    $questionInfo: {
      title: string,
      descriptin: string,
      options: [string]
    },
    $answer: {
      correctAnswer: [string]
    },
    $likeCounter: {
      likes: 0,
      dislikes: 0
    },
    $private: boolean
  ) {
    createOneQuestion(
      data: {
        creatorId: $creatorId,
        questionType: $questionType,
        tags: $tags,
        questionInfo: $questionInfoData,
        answer: $answerData,
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

const Controls = ({
  setIsOpen,
  setQuestionData,
  questionData
}: QuestionProps) => {

  const session = useSession()
  const client = ServerGraphQLClient(session);
  const creatorId = session?.data?.user.id;
  const [isLoading, setIsLoading] = useState("success");

  const uploadQuestion = async () => {
    console.log(questionData)
    const questionQuery = {
      query: AddQuestion,
      variables: {
          creatorId,
          ...questionData,
          answer: {
            correctAnswer: "123"
          },
          private: false
      },
    };
    const questionPromise = client.query(questionQuery);
    try {
      const [questionsResult] = await Promise.all([questionPromise]);
      console.log(questionsResult)
      setQuestionData((prev) => ({...prev, questionsResult}))
    } catch (err: any) {
      console.log(err.networkError.result);
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.topButtonsLayout}>
        <button className={styles.button({})}
        onClick={async () => {
          if (!questionData) return;
          if (isLoading === "loading") return;
          await uploadQuestion();
        }}>
          Upload Question
          </button>
        <button
          className={styles.button({})}
          onClick={async () => {
            if (!questionData) return;
            if (isLoading === "loading") return;
            const result = await generateQuestion(questionData);
            setQuestionData((prev) => { return {...prev, question: result.newQuestion.question, options: [...result.newQuestion.incorrect], answer: { correctAnswer: [result.newQuestion.correct]}}});
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
