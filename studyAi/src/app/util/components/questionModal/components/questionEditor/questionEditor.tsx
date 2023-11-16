import modalStyles from "../../ModalStyles";
import CreatableSelect from "react-select/creatable";
import { QuestionInfoData } from "../../../../../../../prisma/generated/type-graphql";
import { useQuestionModal } from "../../context/questionModalProvider";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import { TextAreaAutoResizeInput } from "../../../inputs/TextAreaAutoResizeInput";
const styles = modalStyles.mainContentLayout.questionEditor;
const QuestionTagsInput = ({
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
  const { questionData, setQuestionData, currElPos } = modalData;
  // need to update tagOptions with actaul options from DB
  const tagOptions = [
    { value: "science", label: "science" },
    { value: "math", label: "math" },
  ];

  const tagsDefault = questionData?.tags
    ? questionData?.tags.map((tag) => {
        return {
          value: tag,
          label: tag,
        };
      })
    : undefined;
  return (
    <div className={currInputFieldContainerClassNames.join(" ")}>
      <label htmlFor="tags" className={currLabelClassNames.join(" ")}>
        Tags
      </label>
      <CreatableSelect
        id="tags"
        options={tagOptions}
        value={tagsDefault}
        onChange={(e) =>
          setQuestionData({
            ...questionData,
            tags: e.map((tag) => tag.value),
          })
        }
        classNames={{
          control: () => "min-h-0",
          valueContainer: () => currInputClassNames.join(" "),
          input: () => "m-0 p-0",
          menu: () => "m-0",
          option: () => currInputClassNames.join(" ")
        }}
        isMulti
      />
    </div>
  );
};
const QuestionDescriptionInput = ({
  currLabelClassNames,
  currInputFieldContainerClassNames,
}: {
  currInputFieldContainerClassNames: string[];
  currLabelClassNames: string[];
}) => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData, currElPos } = modalData;
  return (
    <div className={currInputFieldContainerClassNames.join(" ")}>
      <label htmlFor="description" className={currLabelClassNames.join(" ")}>
        Description
      </label>
      <TextAreaAutoResizeInput
        id={"description"}
        minRows={8}
        value={questionData?.questionInfo?.description}
        name={"description"}
        style={{ height: "100%", resize: "none" }}
        className="px-3 py-2 text-sm grow border border-neutral-neutral80"
        placeholder="Write your question here"
        onChange={(e) => {
          //update state
          setQuestionData({
            ...questionData,
            questionInfo: {
              ...(questionData.questionInfo as QuestionInfoData),
              description: e.target.value,
            },
          });
        }}
      />
    </div>
  );
};
const QuestionEditor = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { questionData, setQuestionData, currElPos } = modalData;
  const currLabelClassNames = [...styles.inputField.label];
  const currInputClassNames = [...styles.inputField.input({})];
  const currInputFieldContainerClassNames = [...styles.inputField.container];
  if (currElPos) {
    const width = currElPos.position.width;
    if (width > 640) {
      currLabelClassNames.push("text-lg", "mb-3");
      currInputClassNames.push("py-3", "px-3");
      currInputFieldContainerClassNames.push("my-3");
    } else {
      currLabelClassNames.push("text-sm", "mb-2");
      currInputClassNames.push("py-2", "px-2");
      currInputFieldContainerClassNames.push("my-2");
    }
  }
  return (
    <div className={styles.layout.join(" ")}>
      <TextFieldInput
        name={"title"}
        label={"Title"}
        value={questionData?.questionInfo?.title}
        labelClassNames={currLabelClassNames.join(" ")}
        containerClassNames={currInputFieldContainerClassNames.join(" ")}
        variant="filled"
        inputProps={{
          className: currInputClassNames.join(" "),
        }}
        sx={{
          minHeight: "unset",
        }}
        onChange={(e) =>
          setQuestionData({
            ...questionData,
            questionInfo: {
              ...(questionData.questionInfo as QuestionInfoData),
              title: e.target.value,
            },
          })
        }
      />
      <QuestionTagsInput
        currLabelClassNames={currLabelClassNames}
        currInputFieldContainerClassNames={currInputFieldContainerClassNames}
        currInputClassNames={currInputClassNames}
      />
      <QuestionDescriptionInput
        currLabelClassNames={currLabelClassNames}
        currInputFieldContainerClassNames={currInputFieldContainerClassNames}
      />
    </div>
  );
};

export default QuestionEditor;
