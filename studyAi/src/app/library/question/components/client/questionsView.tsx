"use client";
import { Container } from "../server/containerBar";
import { Button, Chip, IconButton } from "@mui/material";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from "@mui/icons-material";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { parseInteger } from "@/app/util/parsers/parseInt";
import { Carousel } from "@/app/util/components/carousel/carousel";

const QuestionActionBtns = () => {
  return (
    <div className="flex items-center space-x-1">
      <IconButton className="h-[70%]" type="button">
        <FontAwesomeIcon icon={faPlus} className="text-lg" />
      </IconButton>
      <IconButton className="h-[70%]" type="button">
        <Share className="text-lg" />
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
    <div className="flex items-center mr-1">
      <Button
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
      >
        <FontAwesomeIcon icon={faThumbsUp} className="text-lg" />
        <span className="text-sm">
          {parseInteger(question?.likeCounter?.likes)}
        </span>
      </Button>
      <Button
        className="space-x-1"
        variant="text"
        sx={{ minWidth: "unset" }}
        type="button"
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
export const QuestionView = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;

  if (!question) return <></>;
  return (
    <Container overflow className="px-[5%] py-5 grow">
      {question.question && (
        <h2 className="text-3xl font-semibold mb-1 flex align-center">
          {question.question.title}
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

      {question.question && (
        <p className="text-sm pb-5">{question.question.description}</p>
      )}
    </Container>
  );
};
