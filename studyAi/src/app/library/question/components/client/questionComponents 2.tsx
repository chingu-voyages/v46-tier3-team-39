"use client";
import ContainerBar, { Container } from "../server/containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { containerTabs, InnerContainer  } from "../server/questionComponents";
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
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
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
