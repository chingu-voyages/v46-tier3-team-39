"use client";

import { Question } from "../../../../../../prisma/generated/type-graphql";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { Carousel } from "@/app/util/components/carousel/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function QuestionList({
  questions,
}: {
  questions: Partial<Question>[];
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const styles = {
    layout: ["w-full", "border", "bg-light-surface", "mt-8"].join(" "),
    controlsLayout: [
      "flex",
      "w-full",
      "justify-between",
      "items-center",
      "sm: px-4",
    ].join(" "),
    createButton: ["bg-light-primary", "h-[30px]", "w-[30px]", "mr-4"].join(
      " "
    ),
    h2: ["text-[#5C5F60]"].join(" "),
    titlesLayout: [
      "flex",
      "justify-between",
      "py-4",
      "px-2",
      "bg-LightGrey",
      "sm:px-16",
    ].join(" "),
  };

  return (
    <Box className={styles.layout}>
      <Box className={styles.controlsLayout}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
        </Tabs>
        <QuestionModalWrapper>
          <button className={styles.createButton}>+</button>
        </QuestionModalWrapper>
      </Box>
      <div className={styles.titlesLayout}>
        <h2 className={styles.h2}>Question</h2>
        <h2 className={styles.h2}>Shared With</h2>
      </div>

      {/*panel for the ALL tab  */}
      <CustomTabPanel value={tabValue} index={0}>
        <List questions={questions} />
      </CustomTabPanel>
      {/*add more panels under here wrapped in CustomTabPanel and pass questions needed into <List>*/}
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="mb-[-1px]">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function List({ questions }: { questions: Partial<Question>[] }) {
  const styles = {
    layout: [
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "border-b",
      "border-[#5C5F60]",
      "sm:px-16",
    ].join(" "),
    h3: ["text-xl", "mb-2"].join(" "),
    h4: ["text-lg", "text-[#5C5F60]"].join(" "),
    tag: ["p-1", "bg-[#CDCDCD]", "mx-2", "rounded-full", "mt-4"].join(" "),
  };
  return (
    <>
      {questions.map((question, index) => {
        return (
          <Link
            key={index}
            className={styles.layout}
            href={`/library/question/${question.id}`}
          >
            <div>
              <h4 className={styles.h4}>{question.questionType}</h4>
              <h3 className={styles.h3}>{question.questionInfo?.title}</h3>
              <Carousel>
                {(question.tags as string[]).map((tag, index) => {
                  return (
                    <span
                      className={styles.tag}
                      key={(question.id as string) + index}
                    >
                      {tag}
                    </span>
                  );
                })}
              </Carousel>
            </div>
            <FontAwesomeIcon icon={faEarthAmericas} width="16" />
          </Link>
        );
      })}
    </>
  );
}
