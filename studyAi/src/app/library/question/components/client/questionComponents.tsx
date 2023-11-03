"use client";
import ContainerBar, { Container } from "../server/containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuestions } from "@/app/stores/questionStore";
import { useParams } from "next/navigation";
import { containerTabs, InnerContainer } from "../server/questionComponents";
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
  const btnStyles = {
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
          <IconButton
            type="button"
            sx={btnStyles}
            className={btnClassNames + " aspect-square h-[70%]"}
          >
            <EditIcon className="text-base" />
          </IconButton>
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
      className="max-h-[30rem] md:max-h-none md:w-[calc(50%-0.5rem)] md:mr-2"
      border
    >
      <TopBar view={view} handleChange={handleChange} />
      <InnerContainer view={view} />
    </Container>
  );
};
export default QuestionContainer;
