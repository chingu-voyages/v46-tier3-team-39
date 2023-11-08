"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import ContainerBar, { Container } from "./containerBar";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionTypes } from "@/app/util/types/UserData";
const determineAnswerTitle = (str?: string) => {
  const matchStr = str as (typeof QuestionTypes)[number];
  switch (matchStr) {
    case "multipleChoice":
      return "Select the best answer";
    case "Checkbox":
      return "Select all that apply";
    case "Short Answer":
      return "Type your answer below";
    default:
      return str;
  }
};
const TopBar = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  return (
    <ContainerBar>
      <h3>{determineAnswerTitle(question?.questionType)}</h3>
      <div className="flex items-center h-full">
        <IconButton>
          <FontAwesomeIcon icon={faRefresh} />
        </IconButton>
        <IconButton>
          <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
        </IconButton>
      </div>
    </ContainerBar>
  );
};
const AnswerContainer = ({ height }: { height?: string | number }) => {
  return (
    <Container style={{ height: height ? height : undefined }}>
      <TopBar />
    </Container>
  );
};
export default AnswerContainer;
