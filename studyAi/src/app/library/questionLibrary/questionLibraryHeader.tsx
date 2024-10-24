"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
import AddIcon from "@mui/icons-material/Add";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";
import { useQuestionLibraryData } from "./context/questionLibraryContext";
import { determineSortQuery } from "./helpers/determineSortQuery";
import { determinePrivateQuery } from "./helpers/determinePrivateQuery";
import { determineCreatorIdQuery } from "./helpers/determineCreatorIdQuery";
import ObjectID from "bson-objectid";
const tabValues = ["All", "Private", "Public"] as const;
export const QuestionsLibraryHeader = () => {
  const session = useSession();
  const libraryData = useQuestionLibraryData();
  if (!libraryData) return <></>;
  const {
    pageType,
    loading,
    tabValue,
    setTabValue,
    sortValue,
    sortOrder,
    setCursor,
    resetItems,
    getQuestions,
    addOrUpdateItems,
  } = libraryData;
  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    if (loading || newValue === tabValue) return;
    let currVal: "All" | "Private" | "Public" = "All";
    switch (newValue) {
      case "All":
        currVal = "All";
        break;
      case "Private":
        currVal = "Private";
        break;
      case "Public":
        currVal = "Public";
        break;
      default:
        currVal = "All";
        break;
    }
    try {
      const query = {
        variables: {
          private: determinePrivateQuery(currVal),
          orderBy: determineSortQuery(sortValue, sortOrder),
          creatorId: determineCreatorIdQuery(pageType, session),
          cursor: undefined,
          skip: 0,
        },
      };
      const { data: newQuestions } = await getQuestions(query);
      if (!newQuestions || newQuestions.questions.length <= 0) {
        setCursor(null);
        setTabValue(currVal);
        resetItems([]);
        return;
      }
      //we know this contains the id field
      const newQuestionArr =
        newQuestions.questions as QuestionStoreQuestionType[];
      setTabValue(currVal);
      setCursor(newQuestionArr[newQuestionArr.length - 1].id);
      resetItems(newQuestionArr);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      className={`flex flex-row justify-${
        pageType === "user" ? "between" : "end"
      }`}
    >
      {pageType === "user" && (
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="question-access"
          scrollButtons = {'auto'}
          variant="scrollable"
        >
          {tabValues.map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={tab}
              sx={{
                textTransform: "unset",
              }}
            />
          ))}
        </Tabs>
      )}

      <BtnLabelDropdown text="Create question" pointerEvents={false}>
        {(btnLabelProps) => (
          <QuestionModalWrapper
            onSave={(e) => {
              addOrUpdateItems([
                {
                  ...e,
                  id: e.id ? e.id : ObjectID().toString(),
                },
              ]);
            }}
          >
            {(props) => (
              <IconButton
                ref={btnLabelProps.setAnchorEl}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") btnLabelProps.handleClick(e);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") btnLabelProps.handleClose();
                }}
                onClick={props.onClick}
              >
                <AddIcon />
              </IconButton>
            )}
          </QuestionModalWrapper>
        )}
      </BtnLabelDropdown>
    </Box>
  );
};
