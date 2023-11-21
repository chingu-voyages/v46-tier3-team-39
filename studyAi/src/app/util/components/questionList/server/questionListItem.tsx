import Link from "next/link";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { memo } from "react";
import { listStyles as styles } from "./styles";
import QuestionCarouselTags from "../client/questionCarouselTags";
const QuestionListItem = ({
  id,
  questionType,
  title,
  accessKey,
  tags,
}: {
  id: string;
  questionType?: string;
  title?: string;
  accessKey?: boolean;
  tags?: string[];
}) => {
  return (
    <Link className={styles.layout} href={`/library/question/${id}`}>
      <div>
        <h4 className={styles.h4}>{questionType}</h4>
        <h3 className={styles.h3}>{title}</h3>
        <QuestionCarouselTags tags={tags} id={id} />
      </div>
      {accessKey ? <LockIcon /> : <PublicIcon />}
    </Link>
  );
};
const MemoizedQuestionListItem = memo(QuestionListItem);
export default MemoizedQuestionListItem;
