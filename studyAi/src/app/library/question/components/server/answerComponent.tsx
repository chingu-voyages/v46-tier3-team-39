"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import ContainerBar, { Container } from "./containerBar";
import { Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionTypes } from "@/app/util/types/UserData";
import { AnswerType } from "./answerInputs";
const determineAnswerTitle = (str?: string) => {
  const matchStr = str as (typeof QuestionTypes)[number];
  switch (matchStr) {
    case "multipleChoice":
      return "Select the best answer";
    case "selectMultiple":
      return "Select all that apply";
    case "shortAnswer":
      return "Add your answer below";
    default:
      return str;
  }
};
const TopBar = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  const btnClassNames = "flex items-center justify-center h-[70%]";
  const btnStyle = {
    minHeight: "unset",
    padding: 0,
    aspectRatio: 1,
  };

  return (
    <ContainerBar border>
      <h3 className="flex items-center h-full text-sm">
        {determineAnswerTitle(question?.questionType)}
      </h3>
      <div className="flex items-center h-full grow justify-end">
        <IconButton size="small" sx={btnStyle} className={btnClassNames}>
          <FontAwesomeIcon icon={faRefresh} className="text-base" />
        </IconButton>
        <IconButton size="small" sx={btnStyle} className={btnClassNames}>
          <FontAwesomeIcon
            icon={faUpRightAndDownLeftFromCenter}
            className="text-xs"
          />
        </IconButton>
      </div>
    </ContainerBar>
  );
};
const AnswerContainer = ({ height }: { height?: string | number }) => {
  return (
    <Container
      border
      overflow
      className="max-h-[30rem] md:max-h-none"
      style={{ height: height ? height + "px" : undefined }}
    >
      <TopBar />
      <Container overflow className="grow">
        <form className="relative flex flex-col w-full h-full">
          <div className="grow flex flex-col w-full">
            <AnswerType />
          </div>
          <div className="sticky left-0 bottom-0 p-5 flex justify-center items-center border-t border-solid border-Black">
            <Button
              type="submit"
              sx={{ textTransform: "none" }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
};
export default AnswerContainer;
