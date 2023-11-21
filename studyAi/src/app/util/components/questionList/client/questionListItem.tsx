import { Carousel } from "@/app/util/components/carousel/carousel";
import Link from "next/link";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { memo } from "react";
const styles = {
  layout: [
    "flex",
    "items-center",
    "justify-between",
    "p-4",
    "border-b",
    "border-[#5C5F60]",
    "sm:px-16",
  ].join(" "),
  h3: ["text-xl", "mb-2"].join(" "),
  h4: ["text-lg", "text-[#5C5F60]"].join(" "),
  tag: ["p-1", "bg-[#CDCDCD]", "mx-2", "rounded-full", "mt-4"].join(" "),
  paginateContainer: ["flex", "justify-between", "p-4", "w-[400px]"].join(" "),
};
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
        {tags && (
          <Carousel>
            {tags.map((tag, index) => {
              return (
                <span className={styles.tag} key={id + tag + index}>
                  {tag}
                </span>
              );
            })}
          </Carousel>
        )}
      </div>
      {accessKey ? <LockIcon /> : <PublicIcon />}
    </Link>
  );
};
const MemoizedQuestionListItem = memo(QuestionListItem);
export default MemoizedQuestionListItem;
