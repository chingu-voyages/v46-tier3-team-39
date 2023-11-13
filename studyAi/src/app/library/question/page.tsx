"use client"

import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper"
import { Question } from "../../../../prisma/generated/type-graphql"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";

export default function QuestionLibrary() {
    const styles = {
        layout: [
            "py-16",
            "px-5",
            "sm:py-24",
            "sm:px-16"
        ].join(" "),
        h1: [
            "text-3xl",
            "font-bold",
        ].join(" "),
    }
    return (
        <NavigationWrapper
            appBars={{
                navbar: true,
                footer: true,
            }}
        >
            <div className={styles.layout}>
                <h1 className={styles.h1}>My Question Library</h1>
                <QuestionList questions={[{questionInfo: {title: "Question Title", description: "", options: []}, tags: ["science", "math", "history"], questionType:"Short Answer"}]}/>
            </div>
        </NavigationWrapper>
    )

}

function QuestionList({questions} : {questions: Partial<Question>[]}) {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const styles = {
        layout: [
            "w-full",
            "border",
            "bg-light-surface",
            "mt-8"
        ].join(" "),
        controlsLayout: [
            "flex",
            "w-full",
            "justify-between",
            "items-center"
        ].join(" "),
        createButton: [
            "bg-light-primary",
            "h-5/6",
            "w-auto",
            "aspect-square",
            "mr-2",
            "flex-none"
        ].join(" ")
    }

    return (
        <Box className={styles.layout}>
            <Box className={styles.controlsLayout}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All" {...a11yProps(0)} />
                </Tabs>
                <button className={styles.createButton}>+</button>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                All
            </CustomTabPanel>
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
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }