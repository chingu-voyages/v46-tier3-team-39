'use-client'
import CreatableSelect from "react-select/creatable";
import { useQuestionModal } from "../../context/questionModalProvider";
export const QuestionTagsInput = ({
  currLabelClassNames,
  currInputFieldContainerClassNames,
  currInputClassNames,
}: {
  currInputFieldContainerClassNames: string[];
  currLabelClassNames: string[];
  currInputClassNames: string[];
}) => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData } = modalData;
  // need to update tagOptions with actaul options from DB
  const tagOptions = [
    { value: "science", label: "science" },
    { value: "math", label: "math" },
  ];

  const tagsDefault = questionData?.tags
    ? questionData?.tags.map((tag, idx) => {
        return {
          value: tag,
          label: tag,
        };
      })
    : undefined;
  return (
    <div className={currInputFieldContainerClassNames.join(" ")}>
      <label
        htmlFor="question-tags-input"
        className={currLabelClassNames.join(" ")}
      >
        Tags
      </label>
      <CreatableSelect
        name="question-tags-input"
        options={tagOptions}
        value={tagsDefault}
        inputId="question-tags-input"
        onChange={(e) =>
          setQuestionData({
            ...questionData,
            tags: e.map((tag) => tag.value),
          })
        }
        classNames={{
          container: () => "flex w-full",
          control: () => "min-h-0 grow w-min",
          valueContainer: () => currInputClassNames.join(" "),
          input: () => "m-0 p-0",
          menu: () => "m-0",
          option: () => currInputClassNames.join(" "),
        }}
        isMulti
      />
    </div>
  );
};