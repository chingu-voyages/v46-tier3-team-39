import * as React from "react";
import { MultipleChoice, SelectAll, ShortAnswer } from "./answerTypes";
import modalStyles from "../../ModalStyles";
import type { AnswerOption } from "../../../../../../../prisma/generated/type-graphql";
import { useQuestionModal } from "../../context/questionModalProvider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import SegmentIcon from "@mui/icons-material/Segment";
import ObjectId from "bson-objectid";
const AnswerSelectDropdownInput = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData, currElPos } = modalData;
  const currInputFieldContainerClassNames = [
    ...modalStyles.mainContentLayout.questionEditor.inputField.container,
  ];
  const currInputClassNames = [
    ...modalStyles.mainContentLayout.questionEditor.inputField.input({}),
    "flex",
    "items-center",
  ];

  if (currElPos) {
    const width = currElPos.position.width;
    //determine margins
    if (width > 900) currInputFieldContainerClassNames.push("mt-10");
    else if (width > 640) currInputFieldContainerClassNames.push("mt-7");
    else currInputFieldContainerClassNames.push("mt-6");
    //determine padding
    if (width > 640) {
      currInputClassNames.push("p-3", "text-base");
    } else {
      currInputClassNames.push("p-2.5", "text-base");
    }
  }
  const handleChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const target = event.target;
    const newValue = target.value;
    const prevAnswer = questionData.answer?.correctAnswer;
    let questionType = "";
    let newAnswer: AnswerOption[] = [];
    const defaultNewValue = { id: ObjectId().toString(), value: "" };
    if (newValue === "Multiple Choice") {
      questionType = "Multiple Choice";
      newAnswer =
        prevAnswer && prevAnswer.length > 0
          ? [prevAnswer[0]]
          : [defaultNewValue];
    } else if (newValue == "Select Multiple") {
      questionType = "Select Multiple";
      newAnswer = prevAnswer ? prevAnswer : [defaultNewValue];
    } else {
      questionType = "Short Answer";
      newAnswer = [defaultNewValue];
    }
    const newAnswerKey = questionData.answer
      ? questionData.answer
      : { id: ObjectId().toString(), correctAnswer: [] };
    setQuestionData((prev) => ({
      ...prev,
      questionType: questionType,
      answer: { ...newAnswerKey, correctAnswer: newAnswer },
    }));
  };

  return (
    <FormControl
      fullWidth
      className={currInputFieldContainerClassNames.join(" ")}
    >
      <InputLabel id="question-modal-answer-type-label">Answer Type</InputLabel>
      <Select
        labelId="question-modal-answer-type-label"
        id="question-modal-answer-type"
        value={questionData?.questionType}
        label="Answer Type"
        onChange={handleChange}
        sx={{ minHeight: "unset" }}
        slotProps={{
          input: {
            className: currInputClassNames.join(" "),
          },
        }}
      >
        <MenuItem
          value={"Multiple Choice"}
          className={currInputClassNames.join(" ")}
        >
          <RadioButtonCheckedOutlinedIcon className="mr-2" />
          Multiple Choice
        </MenuItem>
        <MenuItem
          value={"Select Multiple"}
          className={currInputClassNames.join(" ")}
        >
          <CheckBoxOutlinedIcon className="mr-2" />
          Checkboxes
        </MenuItem>
        <MenuItem
          value={"Short Answer"}
          className={currInputClassNames.join(" ")}
        >
          <SegmentIcon className="mr-2" />
          Short Answer
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default function AnswerEditor() {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData } = modalData;
  const questionType = questionData?.questionType;
  let answerType: React.ReactNode;
  switch (questionType) {
    case "Multiple Choice":
      answerType = <MultipleChoice />;
      break;
    case "Select Multiple":
      answerType = <SelectAll />;
      break;
    case "Short Answer":
      answerType = <ShortAnswer />;
      break;
    default:
      answerType = <ShortAnswer />;
      break;
  }
  return (
    <Box className="flex flex-col w-full">
      <AnswerSelectDropdownInput />
      {answerType}
    </Box>
  );
}
