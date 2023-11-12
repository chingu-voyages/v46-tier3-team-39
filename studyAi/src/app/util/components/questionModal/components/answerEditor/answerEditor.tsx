import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MultipleChoice, SelectAll, ShortAnswer } from "./answerTypes";
import styles from "./answerEditorStyles";
import { QuestionProps } from "../../questionEditModal";
import type { AnswerOption } from "../../../../../../../prisma/generated/type-graphql";

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
      {value === index && (
        <Box className={styles.customTabPanel}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AnswerEditor({
  questionData,
  setQuestionData
}: Pick<QuestionProps, "questionData" | "setQuestionData">) {
  const questionType = questionData?.questionType;
  let initialTab = 0;
  if (questionType == "Select Multiple") {
    initialTab = 1;
  } else if (questionType == "Short Answer") {
    initialTab = 2;
  }
  const [tabValue, setTabValue] = React.useState(initialTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const options = questionData.questionInfo?.options
    setTabValue(newValue);
    let questionType = "";
    let newAnswer: AnswerOption[] = []
    if (newValue == 0) {
      questionType = "Multiple Choice";
      newAnswer = options ? [options[0]] : []
    }else if (newValue == 1) {
      questionType = "Select Multiple"
    }else {
      questionType = "Short Answer"
    }

    setQuestionData({...questionData, questionType: questionType, answer: {correctAnswer: newAnswer}})
  };
  return (
    <Box className={styles.layout}>
      <h2 className={styles.h2}>Answer</h2>
      <div className={styles.tabsContainer}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="answer types">
          <Tab
            className={styles.tabLabel}
            label="Multiple Choice"
            {...a11yProps(0)}
          />
          <Tab
            className={styles.tabLabel}
            label="Select All"
            {...a11yProps(1)}
          />
          <Tab
            className={styles.tabLabel}
            label="Short Answer"
            {...a11yProps(2)}
          />
        </Tabs>
      </div>
      <CustomTabPanel value={tabValue} index={0}>
        <MultipleChoice questionData={questionData} setQuestionData={setQuestionData} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <SelectAll questionData={questionData} setQuestionData={setQuestionData} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <ShortAnswer questionData={questionData} setQuestionData={setQuestionData}/>
      </CustomTabPanel>
    </Box>
  );
}
