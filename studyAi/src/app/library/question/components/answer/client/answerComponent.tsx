"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import ContainerBar, { Container } from "../../page/server/containerBar";
import { Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLeftAndUpRightToCenter,
  faRefresh,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionTypes } from "@/app/util/types/UserData";
import { useFullscreen } from "@/app/util/providers/FullscreenProvider";
import React from "react";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import { AnswerType } from "./answerTypeContainer";
import { useQuestionId } from "../../../context/QuestionIdContext";
const determineAnswerTitle = (str?: string) => {
  const matchStr = str as (typeof QuestionTypes)[number];
  switch (matchStr) {
    case "Multiple Choice":
      return "Select the best answer";
    case "Select Multiple":
      return "Select all that apply";
    case "Short Answer":
      return "Add your answer below";
    default:
      return str;
  }
};
const FullScreenBtn = ({
  btnClassNames,
  btnStyle,
}: {
  btnClassNames?: string;
  btnStyle?: React.CSSProperties;
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  return (
    <BtnLabelDropdown
      text={`Fullscreen ${isFullscreen ? "Off" : "On"}`}
      pointerEvents={false}
    >
      {(props) => (
        <IconButton
          ref={props.setAnchorEl}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") props.handleClick(e);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") props.handleClose();
          }}
          size="small"
          sx={btnStyle}
          className={btnClassNames}
          type="button"
          aria-label={`toggle fullscreen ${isFullscreen ? "off" : "on"}`}
          onClick={toggleFullscreen}
        >
          {!isFullscreen ? (
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className="text-xs"
            />
          ) : (
            <FontAwesomeIcon
              icon={faDownLeftAndUpRightToCenter}
              className="text-xs"
            />
          )}
        </IconButton>
      )}
    </BtnLabelDropdown>
  );
};
const ResetAnswerBtn = ({
  btnClassNames,
  btnStyle,
  questionId,
}: {
  questionId: string;
  btnClassNames?: string;
  btnStyle?: React.CSSProperties;
}) => {
  const [currSubmissions, { deleteItems }] = useQuestionSubmissions();
  const submission = currSubmissions.ongoingData[questionId];
  return (
    <BtnLabelDropdown text="Reset" pointerEvents={false}>
      {(props) => (
        <IconButton
          ref={props.setAnchorEl}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") props.handleClick(e);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") props.handleClose();
          }}
          onClick={() => {
            if (submission && submission.questionId)
              deleteItems([
                {
                  questionId: submission.questionId,
                },
              ]);
          }}
          size="small"
          sx={btnStyle}
          className={btnClassNames}
          type="button"
        >
          <FontAwesomeIcon icon={faRefresh} className="text-base" />
        </IconButton>
      )}
    </BtnLabelDropdown>
  );
};
const TopBar = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const btnClassNames = "flex items-center justify-center h-[70%]";
  const btnStyle: React.CSSProperties = {
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
        {question && (
          <ResetAnswerBtn
            questionId={question.id}
            btnClassNames={btnClassNames}
            btnStyle={btnStyle}
          />
        )}
        <FullScreenBtn btnClassNames={btnClassNames} btnStyle={btnStyle} />
      </div>
    </ContainerBar>
  );
};
const AnswerContainer = ({ height }: { height?: string | number }) => {
  return (
    <Container
      border
      overflow
      className="max-h-[max(30rem,45vh)] md:max-h-none md:w-3/6 md:ml-2 grow"
      style={{ height: height ? height + "px" : undefined }}
      fullHeight={false}
    >
      <TopBar />
      <Container overflow className="grow">
        <div className="relative flex flex-col w-full h-full">
          <div className="grow flex flex-col w-full">
            <AnswerType />
          </div>
          <div className="sticky left-0 bottom-0 p-5 flex justify-center items-center border-t border-solid border-Black">
            <Button
              className="text-Black"
              type="submit"
              sx={{ textTransform: "none" }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>
    </Container>
  );
};
export default AnswerContainer;
