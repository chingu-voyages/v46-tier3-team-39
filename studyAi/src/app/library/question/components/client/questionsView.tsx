"use client";
import { Container } from "../server/containerBar";
import { Chip, IconButton } from "@mui/material";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from "@mui/icons-material";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { parseInteger } from "@/app/util/parsers/parseInt";

const QuestionActionBtns = () => {
  return (
    <div className="flex items-center space-x-2">
      <IconButton>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
      <IconButton>
        <Share />
      </IconButton>
    </div>
  );
};
const LikeCounterBtns = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  return (
    <div className="flex items-center mr-2">
      <IconButton className="space-x-1">
        <FontAwesomeIcon icon={faThumbsUp} />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.likes)}
        </span>
      </IconButton>
      <IconButton className="space-x-1">
        <FontAwesomeIcon
          icon={faThumbsDown}
          style={{ transform: "scale(-1, 1)" }}
        />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.dislikes)}
        </span>
      </IconButton>
    </div>
  );
};
export const QuestionView = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;

  if (!question) return <></>;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question.question && (
        <h2 className="text-6xl font-semibold mb-2 flex align-center">
          {question.question.title}
        </h2>
      )}
      <div className="flex items-center w-full mb-4">
        <LikeCounterBtns />
        <QuestionActionBtns />
      </div>
      {question.tags && (
        <div className="flex w-full flex-wrap justify-stretch mb-6">
          {question.tags.map((tag, idx) => (
            <Chip
              key={tag + idx}
              label={tag}
              size="small"
              className="mr-3 my-1"
            />
          ))}
        </div>
      )}

      {question.question && (
        <p className="text-base pb-5">{question.question.description}</p>
      )}
    </Container>
  );
};
