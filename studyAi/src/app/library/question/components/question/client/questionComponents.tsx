"use client";
import ContainerBar, { Container } from "../../page/server/containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { containerTabs, InnerContainer } from "../server/questionViewContainer";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { useQuestionId } from "../../../context/QuestionIdContext";
const EditBtn = ({
  btnStyles,
  btnClassNames,
  questionId,
}: {
  btnStyles: React.CSSProperties;
  btnClassNames: string;
  questionId: string;
}) => {
  const [questionData, { addOrUpdateItems }] = useQuestions();
  const questions = questionData.data;
  const question = questions.map[questionId];
  if (!question) return <></>;
  return (
    <BtnLabelDropdown text="Edit Question" pointerEvents={false}>
      {(props) => (
        <QuestionModalWrapper
          initialQuestionData={question}
          onSave={(newQuestion) => {
            addOrUpdateItems([{ ...newQuestion, id: questionId }]);
          }}
          type={{
            type: "edit",
            layout: "modal",
          }}
        >
          <IconButton
            type="button"
            ref={props.setAnchorEl}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") props.handleClick(e);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") props.handleClose();
            }}
            sx={btnStyles}
            className={btnClassNames + " aspect-square h-[70%]"}
          >
            <EditIcon className="text-base" />
          </IconButton>
        </QuestionModalWrapper>
      )}
    </BtnLabelDropdown>
  );
};

const TopBar = ({
  view,
  handleChange,
}: {
  view: (typeof containerTabs)[number];
  handleChange: (
    event: React.SyntheticEvent,
    newValue: (typeof containerTabs)[number]
  ) => void;
}) => {
  const params = useParams();
  const session = useSession();
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const btnStyles: React.CSSProperties = {
    textTransform: "none",
    padding: 0,
    margin: 0,
    minHeight: "unset",
  };
  const btnClassNames = "flex items-center justify-center";
  return (
    <ContainerBar border>
      <Tabs
        value={view}
        onChange={handleChange}
        aria-label="question-options"
        className="[&_.MuiTabs-flexContainer]:h-full"
        sx={{
          height: "100%",
          minHeight: "unset",
        }}
      >
        {containerTabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            className={btnClassNames + " h-full"}
            label={capitalizeEveryWord(tab)}
            sx={btnStyles}
          />
        ))}
      </Tabs>
      {session.data &&
        question &&
        session.data.user.id === question.creatorId && (
          <EditBtn
            btnClassNames={btnClassNames}
            btnStyles={btnStyles}
            questionId={question.id}
          />
        )}
    </ContainerBar>
  );
};
export const QuestionContainer = ({ height }: { height?: string | number }) => {
  const [view, setView] =
    useState<(typeof containerTabs)[number]>("description");
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: (typeof containerTabs)[number]
  ) => setView(newValue);
  return (
    <Container
      style={{ height: height ? height + "px" : undefined }}
      fullHeight={false}
      className="max-h-[max(30rem,45vh)] md:max-h-none md:w-[calc(50%-0.5rem)] md:mr-2 grow"
      border
    >
      <TopBar view={view} handleChange={handleChange} />
      <InnerContainer view={view} />
    </Container>
  );
};
export default QuestionContainer;
