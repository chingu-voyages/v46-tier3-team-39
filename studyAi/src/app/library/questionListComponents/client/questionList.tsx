"use client";
import { Question } from "@prisma/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { Carousel } from "@/app/util/components/carousel/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useQuestions } from "@/app/stores/questionStore";
import PaginatedItems from "@/app/util/components/pagination/pagination";
import AddIcon from "@mui/icons-material/Add";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";

export default function QuestionList(page: string | null) {
  const [tabValue, setTabValue] = useState(0);
  const questions = useQuestions()[0].data.arr;
  const [search, setSearch] = useState("");
  console.log("search", search);

  //for testing pagination
  /* const questions: Partial<Question>[] = Array(100).fill({id:"1", questionInfo: {title: "title"}, questionType: "Short Answer", tags: ["Math"]}) */

  const tagSearched = (tagSearched: string[] | undefined) => {
    if (!tagSearched) return;
    for (const tag of tagSearched) {
      if (tag.includes(search)) return true;
    }
  }

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

  const privateQuestions =
    page === "public" ? [] : questions.filter((question) => question.private);
  const publicQuestions =
    page === "public"
      ? questions
      : questions.filter((question) => !question.private);

  return (
    <Box className={styles.layout}>
      {page === "public" && (
        <Box className={styles.controlsLayout}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Private" {...a11yProps(0)} />
            <Tab label="Public" {...a11yProps(0)} />{" "}
          </Tabs>
          <QuestionModalWrapper>
            <AddIcon />
          </QuestionModalWrapper>
        </Box>
      )}
      <div className={styles.titlesLayout}>
        <h2 className={styles.h2}>Question</h2>
        <h2 className={styles.h2}>
          {page === "public" ? (
            "Shared With"
          ) : (
            <TextField
              id="search-bar"
              size="small"
              name="location"
              variant="outlined"
              label="Search for a quiz"
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
            />
          )}
        </h2>
      </div>

      {/*panel for the ALL tab  */}
      <CustomTabPanel value={tabValue} index={0}>
        <List
          questions={
            search.length >= 3
              ? questions.filter(
                  (question) =>
                    question.questionInfo?.title
                      .toLowerCase()
                      .includes(search) ||
                    question.questionType?.toLowerCase().includes(search) ||
                    tagSearched(question.tags)
                )
              : questions
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <List questions={privateQuestions} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <List questions={publicQuestions} />
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
    paginateContainer: ["flex", "justify-between", "p-4", "w-[400px]"].join(
      " "
    ),
  };

  const formatedQuestions = questions.map((question, index) => {
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
        {question.private ? <LockIcon /> : <PublicIcon />}
      </Link>
    );
  });
  return (
    <>
      <PaginatedItems
        items={formatedQuestions}
        itemsPerPage={10}
        containerClassName={styles.paginateContainer}
      />
    </>
  );
}
