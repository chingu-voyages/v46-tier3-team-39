import React from "react";
import modalStyles from "../../ModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { QuestionProps } from "../../questionEditModal";
import type { AnswerOption } from "../../../../../../../prisma/generated/type-graphql";
import ObjectId from "bson-objectid";
import {
  Radio,
  RadioGroup,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
const styles = modalStyles.mainContentLayout.questionEditor;
const answerInputClassNames = [
  ...styles.inputField.input({}),
  "py-2 pl-2 pr-1",
];
export const MultipleChoice = ({
  questionData,
  setQuestionData,
}: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  const options = questionData.questionInfo?.options as AnswerOption[];
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = (e.target as HTMLInputElement).value;
    let value = "";
    questionData?.questionInfo?.options.forEach((option) => {
      if (option.id === id) {
        value = option.value;
      }
    });
    setQuestionData({
      ...questionData,
      answer: { correctAnswer: [{ id: id, value: value }] },
    });
  };

  return (
    <>
      <RadioGroup
        className="mt-2"
        defaultValue="outlined"
        name="radio-buttons-group"
        value={questionData.answer?.correctAnswer[0].id}
        onChange={handleRadioChange}
      >
        {options.map((_option, index) => {
          const handleInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newOptions = options
              .slice(0, index)
              .concat({ id: options[index].id, value: event.target.value })
              .concat(options.slice(index + 1));
            setQuestionData(
              questionData.questionInfo
                ? {
                    ...questionData,
                    questionInfo: {
                      ...questionData.questionInfo,
                      options: newOptions,
                    },
                  }
                : questionData
            );
          };
          return (
            <div key={`radio-${index}`} className="flex my-2 items-center">
              <Radio value={options[index].id} className="p-0" />
              <TextField
                value={options[index].value}
                type="text"
                variant="standard"
                className={answerInputClassNames.join(" ")}
                onChange={handleInputChange}
                multiline
              />
              <IconButton
                className="ml-0 p-1"
                onClick={() =>
                  deleteChoice(Number(index), { questionData, setQuestionData })
                }
                aria-label="delete-answer-option"
              >
                <CloseOutlinedIcon />
              </IconButton>
            </div>
          );
        })}
      </RadioGroup>
      <div className="flex my-4">
        <RadioButtonUncheckedIcon />
        <NewAnswer
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </div>
    </>
  );
};

export const SelectAll = ({
  questionData,
  setQuestionData,
}: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  const options = questionData.questionInfo?.options as AnswerOption[];

  return (
    <>
      {questionData.questionInfo?.options.map((option, index) => {
        const handleInputChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const newOptions = options
            .slice(0, index)
            .concat({ id: option.id, value: event.target.value })
            .concat(options.slice(index + 1));
          setQuestionData(
            questionData.questionInfo
              ? {
                  ...questionData,
                  questionInfo: {
                    ...questionData.questionInfo,
                    options: newOptions,
                  },
                }
              : questionData
          );
        };
        const handleCheckboxChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const currentAnswer = questionData.answer;
          if (!isChecked(option.id)) {
            setQuestionData(
              currentAnswer
                ? {
                    ...questionData,
                    answer: {
                      correctAnswer: currentAnswer.correctAnswer.concat({
                        id: option.id,
                        value: event.target.value,
                      }),
                    },
                  }
                : questionData
            );
          } else {
            const newCorrectAnswers: AnswerOption[] = [];
            questionData?.answer?.correctAnswer.forEach((answer) => {
              if (answer.id != option.id) {
                newCorrectAnswers.push(answer);
              }
            });
            setQuestionData(
              newCorrectAnswers
                ? {
                    ...questionData,
                    answer: { correctAnswer: newCorrectAnswers },
                  }
                : questionData
            );
          }
        };
        const isChecked = (id: string) => {
          let checked = false;
          questionData.answer?.correctAnswer.forEach((answer) => {
            if (answer.id == id) {
              checked = true;
            }
          });
          return checked;
        };
        return (
          <div key={`select-${index}`} className="flex my-4 items-center">
            <Checkbox
              value={options[index].value}
              checked={isChecked(options[index].id)}
              onChange={handleCheckboxChange}
              className="p-0"
            />
            <TextField
              value={options[index].value}
              variant="standard"
              className={answerInputClassNames.join(" ")}
              onChange={handleInputChange}
              multiline
            />
            <IconButton
              className="p-1 ml-0"
              onClick={() =>
                deleteChoice(Number(index), { questionData, setQuestionData })
              }
              aria-label="delete-answer-option"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </div>
        );
      })}
      <div className="flex my-4">
        <CheckBoxOutlineBlankOutlined />
        <NewAnswer
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </div>
    </>
  );
};

export const ShortAnswer = ({
  questionData,
  setQuestionData,
}: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = {
      id: questionData.answer?.correctAnswer[0].id as string,
      value: event.target.value,
    };
    setQuestionData({
      ...questionData,
      answer: { correctAnswer: [newAnswer] },
    });
  };
  return (
    <textarea
      className={styles.inputField.input({ isTextArea: true }).join(" ")}
      value={questionData.answer?.correctAnswer[0]?.value}
      onChange={changeHandler}
    />
  );
};
const NewAnswer = ({
  questionData,
  setQuestionData,
}: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  const clickHandler = () => {
    const options = questionData.questionInfo?.options;
    const questionInfo = questionData.questionInfo;
    setQuestionData(
      options && questionInfo
        ? {
            ...questionData,
            questionInfo: {
              ...questionInfo,
              options: options.concat({ id: ObjectId().toString(), value: "" }),
            },
          }
        : questionData
    );
  };
  return (
    <Button
      variant="text"
      onClick={clickHandler}
      className="ml-2 items-center py-0 px-1 tracking-normal"
      sx={{
        minWidth: "unset",
        minHeight: "unset",
        textTransform: "none",
      }}
    >
      <span className="font-semibold">Add option</span>
    </Button>
  );
};

const deleteChoice = (
  index: number,
  {
    questionData,
    setQuestionData,
  }: Pick<QuestionProps, "questionData" | "setQuestionData">
) => {
  const options = questionData.questionInfo?.options;
  if (options?.length == 1) {
    return;
  }
  const newOptions = options?.toSpliced(index, 1) as AnswerOption[];
  const currentOption = options ? options[index] : undefined;
  const currentAnswer = questionData.answer?.correctAnswer;
  let newAnswer: AnswerOption[] = [];
  currentAnswer?.forEach((answer) => {
    if (answer.id != currentOption?.id) {
      newAnswer.push(answer);
    }
  });
  if (
    newAnswer.length === 0 &&
    questionData.questionType === "Multiple Choice"
  ) {
    newAnswer = [newOptions[0]];
  }
  setQuestionData(
    questionData.questionInfo && options
      ? {
          ...questionData,
          questionInfo: { ...questionData.questionInfo, options: newOptions },
          answer: { correctAnswer: newAnswer },
        }
      : questionData
  );
};
