import React from "react";
import modalStyles from "../../ModalStyles";
import { QuestionProps } from "../../questionEditModal";
import type { AnswerOption } from "../../../../../../../prisma/generated/type-graphql";
import ObjectId from "bson-objectid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import { TextAreaAutoResizeInput } from "../../../inputs/TextAreaAutoResizeInput";
import { useQuestionModal } from "../../context/questionModalProvider";
const styles = modalStyles.mainContentLayout.questionEditor;
const answerInputClassNames = [
  ...styles.inputField.input({}),
  "py-2 pl-2 pr-1",
];
const NewAnswer = ({
  questionData,
  setQuestionData,
}: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  const clickHandler = () => {
    const options = questionData.questionInfo?.options;
    setQuestionData((prev) =>
      options && prev.questionInfo
        ? {
            ...prev,
            questionInfo: {
              ...prev.questionInfo,
              options: options.concat({ id: ObjectId().toString(), value: "" }),
            },
          }
        : prev
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
  const currAnswerKey = questionData.answer
    ? questionData.answer
    : { id: ObjectId().toString(), correctAnswer: [] };
  const currentAnswer = currAnswerKey.correctAnswer;
  let newAnswer: AnswerOption[] = currentAnswer.filter(
    (answer) => answer.id !== currentOption?.id
  );
  if (
    newAnswer.length === 0 &&
    questionData.questionType === "Multiple Choice"
  ) {
    newAnswer = [newOptions[0]];
  }
  setQuestionData((prev) =>
    prev.questionInfo && options
      ? {
          ...prev,
          questionInfo: { ...prev.questionInfo, options: newOptions },
          answer: { ...currAnswerKey, correctAnswer: newAnswer },
        }
      : prev
  );
};
export const MultipleChoice = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData } = modalData;
  const options = questionData.questionInfo?.options as AnswerOption[];
  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const id = value;
    let newValue = "";
    questionData?.questionInfo?.options.forEach((option) => {
      if (option.id === id) {
        newValue = option.value;
      }
    });
    setQuestionData({
      ...questionData,
      answer: {
        id: questionData.answer?.id || ObjectId().toString(),
        correctAnswer: [{ id: id, value: newValue }],
      },
    });
  };
  const currAnswer = questionData.answer?.correctAnswer[0].id || options[0].id;
  return (
    <>
      <RadioGroup
        className="mt-2"
        defaultValue="outlined"
        name="radio-buttons-group"
        value={currAnswer}
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
                name={`multiple-choice-answer-${index}-option`}
                value={options[index].value}
                type="text"
                variant="standard"
                className={answerInputClassNames.join(" ")}
                onChange={handleInputChange}
                multiline
              />
              {options.length > 1 && (
                <IconButton
                  type="button"
                  className="p-1 ml-0"
                  onClick={() =>
                    deleteChoice(Number(index), {
                      questionData,
                      setQuestionData,
                    })
                  }
                  aria-label="delete-answer-option"
                >
                  <CloseOutlinedIcon />
                </IconButton>
              )}
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

export const SelectAll = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData } = modalData;
  const options = questionData.questionInfo?.options as AnswerOption[];

  return (
    <>
      <div className="flex flex-col mt-2">
        {options.map((option, index) => {
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
                        id: currentAnswer?.id || ObjectId().toString(),
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
                      answer: {
                        id: currentAnswer?.id || ObjectId().toString(),
                        correctAnswer: newCorrectAnswers,
                      },
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
            <div key={`select-${index}`} className="flex my-2 items-center">
              <Checkbox
                value={options[index].value}
                checked={isChecked(options[index].id)}
                onChange={handleCheckboxChange}
                className="p-0"
              />
              <TextField
                name={`select-all-answer-${index}-option`}
                value={options[index].value}
                variant="standard"
                className={answerInputClassNames.join(" ")}
                onChange={handleInputChange}
                multiline
              />
              {options.length > 1 && (
                <IconButton
                  type="button"
                  className="p-1 ml-0"
                  onClick={() =>
                    deleteChoice(Number(index), {
                      questionData,
                      setQuestionData,
                    })
                  }
                  aria-label="delete-answer-option"
                >
                  <CloseOutlinedIcon />
                </IconButton>
              )}
            </div>
          );
        })}
      </div>
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

export const ShortAnswer = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData, currElPos } = modalData;
  const currInputClassNames = [...styles.inputField.input({})];
  currInputClassNames.push(
    "px-3 py-2 text-sm grow border border-neutral-neutral80"
  );
  if (currElPos) {
    const width = currElPos.position.width;
    //adjust spacing of text container
    if (width > 640) currInputClassNames.push("mt-6", "mb-2");
    else currInputClassNames.push("mt-4", "mb-2");
  }
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const prevAnswer = questionData.answer
      ? questionData.answer
      : {
          id: ObjectId().toString(),
          correctAnswer: [
            {
              id: ObjectId().toString(),
              value: "",
            },
          ],
        };
    const newAnswer = {
      id: prevAnswer.correctAnswer[0].id as string,
      value: event.target.value,
    };
    setQuestionData((prev) => ({
      ...prev,
      answer: { ...prevAnswer, correctAnswer: [newAnswer] },
    }));
  };
  return (
    <TextAreaAutoResizeInput
      id={"question-short-answer-input"}
      minRows={8}
      value={questionData.answer?.correctAnswer[0]?.value}
      name={"question-short-answer-input"}
      style={{ height: "100%", resize: "none" }}
      className={currInputClassNames.join(" ")}
      placeholder="Write your answer here"
      onChange={changeHandler}
    />
  );
};
