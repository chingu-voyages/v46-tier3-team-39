"use client";
import ContainerBar, { Container } from "./containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Chip, Icon, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Question } from "@prisma/client";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from "@mui/icons-material";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { parseInteger } from "@/app/util/parsers/parseInt";
const containerTabs = ["description", "solution", "attempts"] as const;
const question: Partial<Question> = {
  id: "test",
  creatorId: "6533f4c7489ef223ffc31a99",
  tags: [
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
    "science",
  ],
  likeCounter: {
    likes: 1500000000,
    dislikes: 100000,
  },
  question: {
    title: "Question 1",
    description: "Question 2 is the world",
  },
};
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
  return (
    <div className="flex items-center mr-2">
      <IconButton className="space-x-1">
        <FontAwesomeIcon icon={faThumbsUp} />
        <span className="text-sm">
          {parseInteger(question.likeCounter?.likes)}
        </span>
      </IconButton>
      <IconButton className="space-x-1">
        <FontAwesomeIcon
          icon={faThumbsDown}
          style={{ transform: "scale(-1, 1)" }}
        />
        <span className="text-sm">
          {parseInteger(question.likeCounter?.dislikes)}
        </span>
      </IconButton>
    </div>
  );
};
const InnerContainer = ({ view }: { view: (typeof containerTabs)[number] }) => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  // const question =
  //   params.id && typeof params.id === "string" ? questions[params.id] : null;

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
  // const question =
  //   params.id && typeof params.id === "string" ? questions[params.id] : null;
  return (
    <ContainerBar>
      <Tabs value={view} onChange={handleChange} aria-label="question-options">
        {containerTabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={capitalizeEveryWord(tab)}
            sx={{
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
      {session.data &&
        question &&
        session.data.user.id === question.creatorId && (
          <Button sx={{ textTransform: "none" }}>
            <EditIcon />
          </Button>
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
    <Container style={{ height: height ? height + "px" : undefined }}>
      <TopBar view={view} handleChange={handleChange} />
      <InnerContainer view={view} />
    </Container>
  );
};
export default QuestionContainer;
