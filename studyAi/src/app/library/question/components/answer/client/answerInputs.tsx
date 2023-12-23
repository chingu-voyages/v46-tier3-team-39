"use client";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { InputHTMLAttributes, SyntheticEvent, useRef } from "react";
import { Question } from "@/gql/generated/graphql";
import ReadOnlyInput from "@/app/util/components/inputs/ReadOnlyInput";
import { useQuestionSubmissions } from "@/app/stores/questionSubmissionsStore";
import ObjectId from "bson-objectid";
import { TextAreaAutoResizeInput } from "@/app/util/components/inputs/TextAreaAutoResizeInput";

export const MultipleChoice = ({
  options,
  questionId,
}: {
  options: Question["questionInfo"]["options"];
  questionId: string;
}) => {
  const [currSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const submission = currSubmissions.ongoingData[questionId]
    ? currSubmissions.ongoingData[questionId]
    : {};
  const value =
    submission &&
    submission.answerProvided &&
    submission.answerProvided.length > 0
      ? submission.answerProvided
      : [];
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    addOrUpdateItems(
      [
        {
          ...submission,
          questionId,
          answerProvided: [{ id, value }],
        },
      ],
      "ongoing"
    );
  };
  return (
    <>
      <RadioGroup className="px-[5%] py-5 grow">
        {options.map((val) => {
          const dataProps = {
            "data-id": val.id,
          } as InputHTMLAttributes<HTMLInputElement>;
          return (
            <FormControlLabel
              key={val.id}
              value={val.value}
              slotProps={{
                typography: {
                  className: "text-sm md:text-base",
                },
              }}
              control={
                <Radio
                  inputProps={dataProps}
                  checked={value.length > 0 && value[0].id === val.id}
                />
              }
              label={val.value}
              onChange={onChange}
            />
          );
        })}
      </RadioGroup>
      <ReadOnlyInput
        name={"multipleChoiceAnswer"}
        value={JSON.stringify(value)}
      />
    </>
  );
};
export const ShortAnswer = ({ questionId }: { questionId: string }) => {
  const defaultId = useRef(ObjectId().toString());
  const [currSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const submission = currSubmissions.ongoingData[questionId]
    ? currSubmissions.ongoingData[questionId]
    : {}; //sometimes no ongoing submission will exist.
  //therefore we'll generate one
  const value =
    submission &&
    submission.answerProvided &&
    submission.answerProvided.length > 0
      ? submission.answerProvided
      : [
          {
            id: defaultId.current,
            value: "",
          },
        ];
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    addOrUpdateItems(
      [
        {
          ...submission,
          questionId,
          answerProvided: [{ id, value }],
        },
      ],
      "ongoing"
    );
  };
  return (
    <>
      <TextAreaAutoResizeInput
        minRows={8}
        data-id={value[0].id}
        value={value[0].value}
        style={{ height: "100%", resize: "none" }}
        className="px-[4%] py-4 pb-6 grow text-sm md:text-base"
        placeholder="Type answer here"
        onChange={(e) => {
          //update state
          onChange(e);
        }}
      />
      <ReadOnlyInput name={"shortAnswer"} value={JSON.stringify(value)} />
    </>
  );
};
export const SelectMultiple = ({
  options,
  questionId,
}: {
  options: Question["questionInfo"]["options"];
  questionId: string;
}) => {
  const [currSubmissions, { addOrUpdateItems }] = useQuestionSubmissions();
  const submission = currSubmissions.ongoingData[questionId]
    ? currSubmissions.ongoingData[questionId]
    : {};
  const currValue =
    submission &&
    submission.answerProvided &&
    submission.answerProvided.length > 0
      ? submission.answerProvided
      : [];
  const onChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const { value, checked } = target;
    const data = target.dataset;
    const id = data.id;
    if (!id) return;
    const newState = [...currValue];
    //exists in curr state
    const currEl = currValue
      .map((e, idx) => ({ ...e, idx }))
      .filter((e) => e.id === id);
    if (currEl.length > 0 && !checked) newState.splice(currEl[0].idx, 1);
    else if (currEl.length <= 0 && checked) newState.push({ id, value });
    addOrUpdateItems(
      [
        {
          ...submission,
          questionId,
          answerProvided: newState,
        },
      ],
      "ongoing"
    );
  };
  return (
    <FormGroup className="px-[5%] py-5 grow">
      {options.map((val) => {
        const dataProps = {
          "data-id": val.id,
        } as InputHTMLAttributes<HTMLInputElement>;
        const isCheckedArr = currValue.filter((e) => e.id === val.id);
        return (
          <FormControlLabel
            key={val.id}
            value={val.value}
            slotProps={{
              typography: {
                className: "text-sm md:text-base",
              },
            }}
            control={
              <Checkbox
                inputProps={dataProps}
                checked={isCheckedArr.length > 0}
              />
            }
            label={val.value}
            onChange={onChange}
          />
        );
      })}
      {/*Hidden input that we'll use to grab data upon submission*/}
    </FormGroup>
  );
};
