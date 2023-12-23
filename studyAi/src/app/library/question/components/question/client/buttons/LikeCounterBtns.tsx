"use client";
import Button from "@mui/material/Button";
import { useQuestions } from "@/app/stores/questionStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons/faThumbsDown";
import { parseInteger } from "@/app/util/parsers/parseInt";
import { MouseEvent, useEffect, useTransition, useState, useRef } from "react";
import { useQuestionId } from "../../../../context/QuestionIdContext";
import { performLikeAction } from "../../server/actions";
import { useSession } from "next-auth/react";
import { QuestionLike } from "@prisma/client";
import { useLazyQuery } from "@apollo/client";
import { GetQuestionLikeDoc } from "@/gql/queries/questionLikeQueries";
type QuestionLikeData = Partial<Pick<QuestionLike, "dislike" | "id">> | null;
const LikeCounterBtns = () => {
  const [questionData, { addOrUpdateItems }] = useQuestions();
  const questions = questionData?.data;
  const questionIdData = useQuestionId();
  const [isPending, startTransition] = useTransition();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  //grab question like info
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [getQuestionLike] = useLazyQuery(GetQuestionLikeDoc);
  const [questionLikeData, setQuestionLikeData] =
    useState<QuestionLikeData>(null);
  const prevQuestionLikeData = useRef<QuestionLikeData>(null);
  useEffect(() => {
    if (!questionId || !userId) return;
    getQuestionLike({
      variables: {
        questionId,
        userId,
      },
    }).then((result) => {
      const data = result.data?.questionLikes?.[0];
      if (!data) return;
      setQuestionLikeData({
        id: data.id,
        dislike: data.dislike,
      });
    });
  }, [questionId, userId, getQuestionLike]);
  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (isPending) return;
    const target = e.currentTarget;
    const dataset = target.dataset;
    const type = dataset["likeBtnType"];
    const actionType = type === "like" ? "like" : "dislike";
    //are values the same? If so, we immeaditely return
    if (
      questionLikeData &&
      questionLikeData.dislike === (actionType === "dislike")
    )
      return;
    if (!questionId || !question?.likeCounter) return;
    //we assume we'll succeed so update immeaditely
    const likeActionName = actionType === "like" ? "likes" : "dislikes";
    const prevLikeActionName = actionType === "like" ? "dislikes" : "likes";
    setQuestionLikeData((prev) => {
      prevQuestionLikeData.current = prev;
      return {
        id: prev?.id,
        dislike: actionType === "dislike" ? true : false,
      };
    });
    addOrUpdateItems([
      {
        id: questionId,
        likeCounter: {
          ...question.likeCounter,
          [prevLikeActionName]: questionLikeData
            ? question.likeCounter[prevLikeActionName] - 1
            : question.likeCounter[prevLikeActionName],
          [likeActionName]: question.likeCounter[likeActionName] + 1,
        },
      },
    ]);
    startTransition(async () => {
      if (!questionId || !question?.likeCounter) return;
      try {
        const result = await performLikeAction(actionType, questionId);
        if (!result) return;
        const [userLikeResult, questionDataResult] = result;
        if (questionDataResult) {
          addOrUpdateItems([
            {
              id: questionId,
              likeCounter: questionDataResult,
            },
          ]);
        }
        if (userLikeResult) {
          setQuestionLikeData(userLikeResult);
        }
      } catch (error) {
        //we failed so revert ui to proper state
        addOrUpdateItems([
          {
            id: questionId,
            likeCounter: {
              ...question?.likeCounter,
              [likeActionName]: question.likeCounter[likeActionName] - 1,
            },
          },
        ]);
        setQuestionLikeData(prevQuestionLikeData.current);
        console.error(error);
      }
    });
  };
  const btnClasses = ["space-x-1"];
  const activeBtnClasses = [...btnClasses, "text-dark-on-secondary"];
  return (
    <div className="flex items-center mr-1">
      <Button
        disabled={isPending}
        className={
          questionLikeData && !questionLikeData.dislike
            ? activeBtnClasses.join(" ")
            : btnClasses.join(" ")
        }
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
        data-like-btn-type={"like"}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faThumbsUp} className="text-lg " />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.likes)}
        </span>
      </Button>
      <Button
        disabled={isPending}
        data-like-btn-type={"dislike"}
        className={
          questionLikeData && questionLikeData.dislike
            ? activeBtnClasses.join(" ")
            : btnClasses.join(" ")
        }
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          style={{ transform: "scale(-1, 1)" }}
          className="text-lg"
        />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.dislikes)}
        </span>
      </Button>
    </div>
  );
};
export default LikeCounterBtns;
