import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MultipleChoice, SelectAll, ShortAnswer } from './answerTypes';

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
        <Box className="bg-White sm:h-[365px] p-3">
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

export default function AnswerEditor() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="sm:w-[425px]">
      <h2 className="sm:text-5xl text-3xl text-center font-semibold mb-2">Answer</h2>
      <div className="bg-White">
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="answer types"
        >
          <Tab label="Multiple Choice" {...a11yProps(0)} />
          <Tab label="Select All" {...a11yProps(1)} />
          <Tab label="Short Answer" {...a11yProps(2)} />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <MultipleChoice />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SelectAll />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ShortAnswer/>
      </CustomTabPanel>
    </Box>
  );
}