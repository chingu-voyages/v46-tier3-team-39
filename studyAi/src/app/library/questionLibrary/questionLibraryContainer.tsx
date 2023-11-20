"use client";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { QuestionsLibraryHeader } from "./questionLibraryHeader";
import {
  QuestionLibraryContextData,
  QuestionLibraryProvider,
  useQuestionLibraryData,
} from "./context/questionLibraryContext";
export const QuestionLibraryList = () =>
  //   {
  //   children,
  // }: {
  //   children: (props: QuestionLibraryContextData) => React.ReactNode;
  //     }
  {
    const props = useQuestionLibraryData();
    if (!props) return <></>;
    return;
    // return children(props);
  };
export default function QuestionsLibraryContainer({
  pageType,
}: // children,
{
  pageType: "user" | "public";
  // children: (props: QuestionLibraryContextData) => React.ReactNode;
}) {
  return (
    <Box className={styles.layout}>
      <QuestionLibraryProvider>
        <QuestionsLibraryHeader pageType={pageType} />
        <QuestionLibraryList />
        {/* <QuestionLibraryList>{children}</QuestionLibraryList> */}
      </QuestionLibraryProvider>
    </Box>
  );
}

/* <div className={styles.titlesLayout}>
        <h2 className={styles.h2}>Question</h2>
      </div> */

/*
Search bar for another time
*/
// const [search, setSearch] = useState("");
// const tagSearched = (tagSearched: string[] | undefined) => {
//   if (!tagSearched) return;
//   for (const tag of tagSearched) {
//     if (tag.includes(search)) return true;
//   }
// };
/* <h2 className={styles.h2}>
          <TextField
            id="search-bar"
            size="small"
            name="location"
            variant="outlined"
            label="Search for a quiz"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
        </h2> */
