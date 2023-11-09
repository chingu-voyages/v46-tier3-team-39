import TimeFormatDropdown from "./timeFormat";
import styles from "./leftContentStyles";
import CreatableSelect from "react-select/creatable";
import { QuestionProps } from "../../questionEditModal";
import { QuestionInfoData } from "../../../../../../../prisma/generated/type-graphql";
const LeftContent = ({ questionData, setQuestionData }: Pick<QuestionProps, "questionData" | "setQuestionData">) => {
  
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
    <div className={styles.layout}>
      <form>
        <div>
          <label htmlFor="title" className={styles.label}>
            Question Title
          </label>
          <input
            id="title"
            className={styles.input({})}
            value={questionData?.questionInfo?.title}
            onChange={(e) => setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, title: e.target.value}})}
          />
        </div>
        <div className={styles.estTimeLayout}>
          <label htmlFor="time" className={styles.label}>
            Est. Time
          </label>
          <input id="time" className={styles.input({ isTime: true })} />
          <TimeFormatDropdown />
        </div>
        <div>
          <label htmlFor="tags" className={styles.label}>
            Tags
          </label>
          <CreatableSelect
            id="tags"
            className={styles.input({})}
            options={tagOptions}
            value={tagsDefault}
            onChange={(e) => setQuestionData({...questionData, tags: e.map((tag) => tag.value)})}
            isMulti
          />
        </div>
        <div>
          <label htmlFor="description" className={styles.label}>
            Question Description
          </label>
          <textarea
            id="description"
            className={styles.input({ isTextArea: true })}
            value={questionData?.questionInfo?.description}
            onChange={(e) => setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, description: e.target.value}})}
          />
        </div>
      </form>
    </div>
  );
};

export default LeftContent;
