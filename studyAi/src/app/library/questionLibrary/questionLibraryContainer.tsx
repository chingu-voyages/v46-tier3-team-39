"use client";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { QuestionsLibraryHeader } from "./questionLibraryHeader";
import { QuestionLibraryProvider } from "./context/questionLibraryContext";
import dynamic from "next/dynamic";
const QuestionLibraryList = dynamic(
  () =>
    import("./questionLibraryList").then(
      (module) => module.QuestionLibraryList
    ),
  { ssr: false }
);
export default function QuestionsLibraryContainer({
  pageType,
}: {
  pageType: "user" | "public";
}) {
  return (
    <Box className={styles.layout}>
      <QuestionLibraryProvider pageType={pageType}>
        <QuestionsLibraryHeader />
        <QuestionLibraryList />
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
