"use client";
import ContainerBar from "./containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
const containerTabs = ["description", "solution", "attempts"] as const;
export const QuestionContainer = () => {
  const session = useSession();
  const params = useParams();
  const [value, setValue] =
    useState<(typeof containerTabs)[number]>("description");
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: (typeof containerTabs)[number]
  ) => setValue(newValue);
  // const 
  return (
    <ContainerBar>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
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
      {/* {session.data?.user.id === } */}
      <Button sx={{ textTransform: "none" }}>
        <EditIcon />
      </Button>
    </ContainerBar>
  );
};
export default QuestionContainer;
