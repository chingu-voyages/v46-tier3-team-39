"use client";
import { Container } from "../../page/server/containerBar";
import { Chip } from "@mui/material";
import { useQuestions } from "@/app/stores/questionStore";
import { Carousel } from "@/app/util/components/carousel/carousel";
import { useQuestionId } from "../../../context/QuestionIdContext";
import LikeCounterBtns from "./buttons/LikeCounterBtns";
import ShareBtn from "./buttons/ShareBtn";
const QuestionActionBtns = () => {
  return (
    <div className="flex items-center space-x-1">
      {/* this is for when a user can add the question to quiz */}
      {/* <IconButton className="h-[70%]" type="button">
        <FontAwesomeIcon icon={faPlus} className="text-lg" />
      </IconButton> */}
      <ShareBtn />
    </div>
  );
};

export const QuestionView = () => {
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;

  if (!question) return <></>;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question.questionInfo && (
        <h2 className="text-3xl font-semibold mb-1 flex align-center">
          {question.questionInfo.title}
        </h2>
      )}
      <div className="flex items-center w-full mb-2">
        <LikeCounterBtns />
        <QuestionActionBtns />
      </div>
      {question.tags && (
        <div className="flex w-full mb-5">
          <Carousel>
            {question.tags.map((tag, idx) => (
              <Chip
                key={tag + idx}
                label={tag.toLowerCase()}
                size="small"
                className="mr-3 my-1 text-xs h-auto py-0.5"
                sx={{
                  minHeight: "unset",
                }}
              />
            ))}
          </Carousel>
        </div>
      )}

      {question.questionInfo && (
        <p className="text-sm pb-5">{question.questionInfo.description}</p>
      )}
    </Container>
  );
};
