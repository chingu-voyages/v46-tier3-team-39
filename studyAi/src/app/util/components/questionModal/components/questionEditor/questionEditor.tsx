import modalStyles from "../../ModalStyles";
import { QuestionInfoData } from "../../../../../../../prisma/generated/type-graphql";
import { useQuestionModal } from "../../context/questionModalProvider";
import { TextFieldInput } from "@/app/auth/components/server/formInputs";
import { TextAreaAutoResizeInput } from "../../../inputs/TextAreaAutoResizeInput";
import dynamic from "next/dynamic";
//import question tags dynamically
//as it auto generates ids
const QuestionTagsInput = dynamic(
  () =>
    import(
      "@/app/util/components/questionModal/components/questionEditor/questionTagsInput"
    ).then((module) => module.QuestionTagsInput),
  { ssr: false }
);
const styles = modalStyles.mainContentLayout.questionEditor;

const QuestionDescriptionInput = ({
  currLabelClassNames,
  currInputFieldContainerClassNames,
}: {
  currInputFieldContainerClassNames: string[];
  currLabelClassNames: string[];
}) => {
  const modalData = useQuestionModal();
  const { questionData, setQuestionData, currElPos } = modalData;
  const currTextFieldInputClassNames = [
    ...currInputFieldContainerClassNames,
    "grow",
  ];
  return (
    <div className={currTextFieldInputClassNames.join(" ")}>
      <label
        htmlFor="question-description-input"
        className={currLabelClassNames.join(" ")}
      >
        Description
      </label>
      {/* This prevents infinite loop re-rendering from MUI due to being unable
      to find the appropriate height for the element */}
      <TextAreaAutoResizeInput
        id={"question-description-input"}
        minRows={8}
        value={questionData?.questionInfo?.description}
        name={"question-description-input"}
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
        id="question-title-input"
        name={"question-title-input"}
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
