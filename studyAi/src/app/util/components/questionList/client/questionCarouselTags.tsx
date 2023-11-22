"use client";
import dynamic from "next/dynamic";
// import { Carousel } from "../../carousel/carousel";
import { listStyles as styles } from "../server/styles";
const Carousel = dynamic(
  () => import("../../carousel/carousel").then((e) => e.Carousel),
  {
    ssr: false,
  }
);
const QuestionCarouselTags = ({
  tags,
  id,
}: {
  tags?: string[];
  id: string;
}) => {
  return (
    tags && (
      <Carousel>
        {tags.map((tag, index) => {
          return (
            <span className={styles.tag} key={id + tag + index}>
              {tag}
            </span>
          );
        })}
      </Carousel>
    )
  );
};
export default QuestionCarouselTags;
