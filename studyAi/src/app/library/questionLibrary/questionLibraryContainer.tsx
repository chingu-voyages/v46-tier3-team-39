"use client";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { QuestionsLibraryHeader } from "./questionLibraryHeader";
import {
  QuestionLibraryProvider,
  useQuestionLibraryData,
} from "./context/questionLibraryContext";
import QuestionsListContainer from "@/app/util/components/questionList/client/questionList";
import { useSession } from "next-auth/react";
import { determineSortQuery } from "./helpers/determineSortQuery";
import { determinePrivateQuery } from "./helpers/determinePrivateQuery";
import { determineCreatorIdQuery } from "./helpers/determineCreatorIdQuery";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
export const QuestionLibraryList = () => {
  const session = useSession();
  const libraryData = useQuestionLibraryData();
  if (!libraryData) return <></>;
  const {
    pageType,
    cursor,
    questions,
    tabValue,
    getQuestions,
    setCursor,
    addOrUpdateItems,
    sortOrder,
    sortValue,
  } = libraryData;
  const fetchMoreData = async () => {
    const queryOptions = {
      variables: {
        cursor: {
          id: cursor,
        },
        skip: cursor ? 1 : null,
        private: determinePrivateQuery(tabValue),
        creatorId: determineCreatorIdQuery(pageType, session),
        orderBy: determineSortQuery(sortValue, sortOrder),
      },
    };
    const { data: results } = await getQuestions(queryOptions);
    if (!results) {
      setCursor(null);
      return [];
    }
    const newQuestionArr = results.questions as QuestionStoreQuestionType[];
    addOrUpdateItems(newQuestionArr);
    if (newQuestionArr.length <= 0) {
      setCursor(null);
      return newQuestionArr;
    }
    //means we have new items to update
    const newNextCursor = newQuestionArr[newQuestionArr.length - 1].id;
    setCursor(newNextCursor || null);
    return newQuestionArr;
  };
  return (
    <QuestionsListContainer
      questions={questions}
      hasMore={!!cursor}
      fetchMoreData={fetchMoreData}
    />
  );
};
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
