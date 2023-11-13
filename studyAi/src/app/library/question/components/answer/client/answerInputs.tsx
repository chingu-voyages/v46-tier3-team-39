"use client";
import { useParams } from "next/navigation";
import { useQuestions } from "@/app/stores/questionStore";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
  useState,
} from "react";
import { ObjectId } from "bson";
import { Question } from "../../../../../../../graphql/generated/graphql";
import { QuestionSubmission } from "../../../../../../../prisma/generated/type-graphql";
const adjustScroll = (
  event: ChangeEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLTextAreaElement>
) => {
  const element = event.currentTarget as HTMLTextAreaElement;
  if (!element) return;
  const { selectionEnd, clientHeight, scrollTop } = element;
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = Number(
    computedStyle.getPropertyValue("line-height").replace("px", "")
  );
  const paddingTop = Number(
    computedStyle.getPropertyValue("padding-top").replace("px", "")
  );
  const paddingBottom = Number(
    computedStyle.getPropertyValue("padding-bottom").replace("px", "")
  );
  let currCursorPos: number, scrollPosBottom: number, scrollPosTop: number;
  currCursorPos = lineHeight * (selectionEnd + 1);
  scrollPosBottom =
    Math.ceil(clientHeight) + Math.ceil(scrollTop) - paddingBottom - lineHeight;
  scrollPosTop = Math.ceil(scrollTop) + paddingTop + lineHeight;
  if (scrollPosBottom <= currCursorPos)
    return (element.scrollTop = Math.ceil(scrollTop) + lineHeight);
  if (currCursorPos <= scrollPosTop) {
    const newScrollPos = Math.ceil(scrollTop) - lineHeight;
    return (element.scrollTop = newScrollPos <= 0 ? 0 : newScrollPos);
  }
};
export const MultipleChoice = ({
  options,
  initialValues,
}: {
  options: Question["questionInfo"]["options"];
  initialValues?: QuestionSubmission["answerProvided"];
}) => {
  const [currAnswer, setCurrAnswer] = useState(
    initialValues ? initialValues : []
  );
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    setCurrAnswer([
      {
        id,
        value,
      },
    ]);
  };
  return (
    <RadioGroup className="px-[5%] py-5 grow" name="multipleChoiceAnswer">
      {options.map((val) => {
        const dataProps = {
          "data-id": val.id,
        } as InputHTMLAttributes<HTMLInputElement>;
        return (
          <FormControlLabel
            key={val.id}
            value={val.value}
            control={<Radio inputProps={dataProps} />}
            label={val.value}
            onChange={onChange}
            checked={currAnswer.length > 0 && currAnswer[0].value === val.value}
          />
        );
      })}
    </RadioGroup>
  );
};
export const SelectMultiple = ({
  options,
  initialValues,
}: {
  options: Question["questionInfo"]["options"];
  initialValues?: QuestionSubmission["answerProvided"];
}) => {
  const [currSelection, setCurrSelection] = useState<
    QuestionSubmission["answerProvided"]
  >([]);
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value, checked } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    setCurrSelection((prev) => {
      const newState = [...prev];
      //exists in curr state
      const currEl = prev
        .map((e, idx) => ({ ...e, idx }))
        .filter((e) => e.id === id);
      if (currEl.length > 0 && !checked) newState.splice(currEl[0].idx, 1);
      else if (currEl.length <= 0 && checked) newState.push({ id, value });
      return newState;
    });
  };
  return (
    <FormGroup className="px-[5%] py-5 grow">
      {options.map((val) => {
        const dataProps = {
          "data-id": val.id,
        } as InputHTMLAttributes<HTMLInputElement>;
        return (
          <FormControlLabel
            key={val.id}
            value={val.value}
            control={<Checkbox inputProps={dataProps} />}
            label={val.value}
            onChange={onChange}
          />
        );
      })}
      {/*Hidden input that we'll use to grab data upon submission*/}
      <input
        name={"selectMultipleSelections"}
        value={JSON.stringify(currSelection)}
        readOnly
        style={{
          visibility: "hidden",
          minWidth: "unset",
          minHeight: "unset",
          width: 0,
          height: 0,
        }}
      />
    </FormGroup>
  );
};
export const ShortAnswer = ({
  initialValues,
}: {
  initialValues?: QuestionSubmission["answerProvided"];
}) => {
  const [currAnswer, setCurrAnswer] = useState(
    initialValues ? initialValues : []
  );
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    setCurrAnswer([
      {
        id,
        value,
      },
    ]);
  };
  return (
    <TextareaAutosize
      minRows={8}
      name="shortAnswer"
      onKeyDown={adjustScroll}
      data-id={
        currAnswer.length > 0 ? currAnswer[0].id : new ObjectId().toString()
      }
      onChange={(e) => {
        //modify scroll cursor pos
        adjustScroll(e);
        //update state
        onChange(e);
      }}
      value={currAnswer.length > 0 ? currAnswer[0].value : ""}
      style={{ height: "100%", resize: "none" }}
      className="px-[4%] py-4 pb-6 text-sm grow"
      placeholder="Type answer here"
    />
  );
};
export const AnswerType = () => {
  const params = useParams();
  const questions = useQuestions()[0].data;
  const question =
    params.id && typeof params.id === "string" ? questions[params.id] : null;
  if (!question) return <></>;
  if (!question.questionInfo) return <></>;
  const {
    questionType,
    questionInfo: { options: questionOptions },
  } = question;
  switch (questionType) {
    case "Multiple Choice":
      return <MultipleChoice options={questionOptions} />;
    case "Select Multiple":
      return <SelectMultiple options={questionOptions} />;
    case "Short Answer":
      return <ShortAnswer />;
    default:
      return <ShortAnswer />;
  }
};
