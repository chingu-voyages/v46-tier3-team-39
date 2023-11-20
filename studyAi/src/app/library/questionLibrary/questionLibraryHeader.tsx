"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { QuestionStoreQuestionType } from "@/app/stores/questionStore";
import AddIcon from "@mui/icons-material/Add";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { styles } from "./styles";
import { QuestionOrderByWithRelationInput } from "../../../../graphql/generated/graphql";
import { useQuestionLibraryData } from "./context/questionLibraryContext";

export const QuestionsLibraryHeader = ({
  pageType,
}: {
  pageType: "user" | "public";
}) => {
  const session = useSession();
  const libraryData = useQuestionLibraryData();
  if (!libraryData) return <></>;
  const {
    loading,
    tabValue,
    setTabValue,
    sortValue,
    sortOrder,
    cursor,
    setCursor,
    resetItems,
    getQuestions,
  } = libraryData;
  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    if (loading || newValue === tabValue) return;
    switch (newValue) {
      case "All":
        setTabValue(newValue);
        break;
      case "Private":
        setTabValue(newValue);
        break;
      case "Public":
        setTabValue(newValue);
        break;
      default:
        setTabValue("All");
        break;
    }
    try {
      let sortObj: QuestionOrderByWithRelationInput = {};
      switch (sortValue) {
        case "date":
          sortObj.dateCreated = sortOrder;
          break;
        case "likes":
          sortObj.likeCounter = {};
          sortObj.likeCounter.likes = sortOrder;
          break;
        case "title":
          sortObj.questionInfo = {};
          sortObj.questionInfo.title = sortOrder;
          break;
        default:
          break;
      }
      const { data: newQuestions } = await getQuestions({
        variables: {
          private:
            tabValue === "All"
              ? null
              : {
                  equals: tabValue === "Private",
                },
          orderBy: sortObj,
          creatorId:
            pageType === "user" && session.status === "authenticated"
              ? { equals: session.data?.user.id }
              : null,
          cursor: cursor
            ? {
                id: cursor,
              }
            : null,
          skip: cursor ? 1 : 0,
        },
      });
      if (!newQuestions || newQuestions.questions.length <= 0) {
        setCursor(null);
        resetItems([]);
        return;
      }
      //we know this contains the id field
      const newQuestionArr =
        newQuestions.questions as QuestionStoreQuestionType[];
      resetItems(newQuestionArr);
      setCursor(newQuestionArr[newQuestionArr.length - 1].id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box className={styles.controlsLayout}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="question-access"
      >
        <Tab value={"All"} label="All" />
        <Tab value={"Private"} label="Private" />
        <Tab value={"Public"} label="Public" />
      </Tabs>
      <BtnLabelDropdown text="Create question" pointerEvents={false}>
        {(btnLabelProps) => (
          <QuestionModalWrapper>
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
      <IconButton></IconButton>
    </Box>
  );
};
