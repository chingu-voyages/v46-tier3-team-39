import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MultipleChoice, SelectAll, ShortAnswer } from './answerTypes';
import styles from "./answerEditorStyles"

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
        <Box className={styles.customTabPanel}>
          {children}
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

export default function AnswerEditor({initialChoices} : {initialChoices: string[]}) {
  const [value, setValue] = React.useState(0);
  const [choices, setChoices] = React.useState(initialChoices)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className={styles.layout}>
      <h2 className={styles.h2}>Answer</h2>
      <div className={styles.tabsContainer}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="answer types"
        >
          <Tab className={styles.tabLabel} label="Multiple Choice" {...a11yProps(0)} />
          <Tab className={styles.tabLabel} label="Select All" {...a11yProps(1)} />
          <Tab className={styles.tabLabel} label="Short Answer" {...a11yProps(2)} />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <MultipleChoice choices={choices} setChoices={setChoices}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SelectAll choices={choices} setChoices={setChoices}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ShortAnswer/>
      </CustomTabPanel>
    </Box>
  );
}