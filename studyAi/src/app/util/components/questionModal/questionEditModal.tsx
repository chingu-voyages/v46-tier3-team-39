"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AnswerEditor from "./components/answerEditor/answerEditor";
import QuestionEditor from "./components/questionEditor/questionEditor";
import Controls from "./components/controls";
import styles, {
  determineMainContentLayoutStyle,
  determineModalStyle,
} from "./ModalStyles";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { SetStateAction } from "react";
import { useQuestionModal } from "./context/questionModalProvider";
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { gql } from "../../../../../graphql/generated";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
const AddQuestion = gql(`
  mutation CreateOneQuestionResolver(
    $creatorId: String!,
    $questionType: String!,
    $tags: QuestionCreatetagsInput,
    $questionInfo: QuestionInfoDataCreateEnvelopeInput!,
    $answer: AnswerDataCreateEnvelopeInput!,
    $likeCounter: LikeCounterCreateEnvelopeInput!,
    $private: Boolean!
  ){
    createOneQuestion(
      data: {
        creatorId: $creatorId,
        questionType: $questionType,
        tags: $tags,
        questionInfo: $questionInfo,
        answer: $answer,
        likeCounter: $likeCounter,
        private: $private
      }
    )
    {
      id
    }
  }
`);
export interface QuestionProps {
  questionData: Partial<Question>;
  closeHandler: () => void;
  setQuestionData: React.Dispatch<SetStateAction<Partial<Question>>>;
}
const QuestionFormHeader = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { type, currElPos, closeHandler } = modalData;
  const formTypeHeaderText = type.type === "edit" ? "Edit" : "Create";
  const currBtnClasses = [...styles.header.closeIcon.btn];
  const currHeaderClasses = [...styles.header.h1];
  const currHeaderContainerClasses = [...styles.header.container];
  const width = currElPos?.position?.width;
  if (currElPos && typeof width === "number") {
    //handle header text
    if (width > 640) currHeaderClasses.push("text-5xl");
    else if (width > 480) currHeaderClasses.push("text-3xl");
    else currHeaderClasses.push("text-2xl", "text-center");
    //handle container margins
    if (width > 640) currHeaderContainerClasses.push("mb-7");
    else if (width > 480) currHeaderContainerClasses.push("mb-4");
    else {
      currHeaderContainerClasses.push("mb-3");
      currHeaderClasses.push("mb-3");
    }
    //handle container flex
    if (width > 480)
      currHeaderContainerClasses.push("justify-between", "items-center");
    else currHeaderContainerClasses.push("items-center", "flex-col");
  }
  return (
    <div className={currHeaderContainerClasses.join(" ")}>
      {type.layout === "modal" && (
        <IconButton
          type="button"
          onClick={closeHandler}
          className={currBtnClasses.join(" ")}
          aria-label="close-question-modal"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.header.closeIcon.icon.join(" ")}
          />
        </IconButton>
      )}
      <h1 className={currHeaderClasses.join(" ")}>
        {formTypeHeaderText + " Your Question"}
      </h1>
      {<Controls />}
    </div>
  );
};
const QuestionFormMainContent = () => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { currElPos } = modalData;
  const currMainContentContainerClasses = [
    ...styles.mainContentLayout.container,
  ];
  if (currElPos)
    determineMainContentLayoutStyle(
      currElPos.position,
      currMainContentContainerClasses
    );
  return (
    <div className={currMainContentContainerClasses.join(" ")}>
      <QuestionEditor />
      <AnswerEditor />
    </div>
  );
};
const QuestionEditFormLoadingBanner = ({ text }: { text: string }) => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { type, currElPos } = modalData;
  const generalBannerStyles = [
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "left-0",
    "w-full",
    "h-full",
    "z-10",
    "bottom-0",
  ];
  const bannerStyles = [...generalBannerStyles, "bg-White", "text-Black"];
  if (type.layout === "page")
    return (
      <Modal open={true}>
        <div className={bannerStyles.join(" ")}>
          <CircularProgress color="primary" />
          <Typography variant="h5" className="mt-6">
            {text}
          </Typography>
        </div>
      </Modal>
    );
  //if displayed as a modal
  bannerStyles.push("absolute");
  return (
    <div className={bannerStyles.join(" ")}>
      <CircularProgress color="primary" />
      <Typography variant="body1" className={"mt-3"}>
        {text}
      </Typography>
    </div>
  );
};
const QuestionEditForm = () => {
  const modalData = useQuestionModal();
  const [mutationQuery, { loading, error, data }] = useMutation(AddQuestion);
  const session = useSession();
  const creatorId = session?.data?.user.id;
  if (!modalData) return <></>;
  const { type, currElPos, questionData, onSave, isGenerating } = modalData;
  const currModalClasses = [...styles.modal];
  if (type.layout === "modal") {
    currModalClasses.push(
      "min-w-[90%]",
      "md:min-w-[65%]",
      "lg:min-w-[50%]",
      "xl:min-w-[40%]",
      "max-h-[80%]",
      "px-[5%]",
      "py-[calc(max(4%,2rem))]",
      "relative"
    );
    if (loading || isGenerating) currModalClasses.push("overflow-y-hidden");
    else currModalClasses.push("overflow-y-auto");
  } else currModalClasses.push("w-full", "min-h-full");
  if (currElPos) determineModalStyle(currElPos.position, currModalClasses);
  const btnContainerClasses = ["w-fit", "py-2", "px-4", "flex"];
  const width = currElPos?.position.width;
  if (typeof width === "number") {
    if (width > 640) btnContainerClasses.push("mt-7");
    else if (width > 480) btnContainerClasses.push("mt-4");
    else btnContainerClasses.push("mt-3");
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //scroll to start
    currElPos?.elementRef?.scrollTo(0, 0);
    if (loading) return;
    const variables = {
      questionType: questionData?.questionType
        ? questionData.questionType
        : "Short Answer",
      tags: {
        set: questionData?.tags ? questionData.tags : [],
      },
      questionInfo: {
        set: questionData?.questionInfo
          ? {
              ...questionData.questionInfo,
            }
          : {
              id: ObjectID().toString(),
              title: "",
              description: "",
              options: [],
            },
      },
      creatorId: creatorId ? creatorId : "",
      likeCounter: {
        set: {
          id: ObjectID().toString(),
          likes: 0,
          dislikes: 0,
        },
      },
      answer: {
        set: {
          id: ObjectID().toString(),
          correctAnswer: questionData?.answer?.correctAnswer
            ? questionData?.answer?.correctAnswer
            : [],
        },
      },
      private: !!questionData?.private,
    };
    const result = await mutationQuery({ variables });
    const newId = result.data?.createOneQuestion.id;
    const newQuestion = {
      ...questionData,
      id: newId ? newId : questionData.id,
    };
    if (onSave) onSave(newQuestion);
  };

  return (
    <div
      className={currModalClasses.join(" ")}
      ref={currElPos ? currElPos.setRef : null}
    >
      {isGenerating && <QuestionEditFormLoadingBanner text="Generating..." />}
      {loading && (
        <QuestionEditFormLoadingBanner
          text={
            type.type === "create"
              ? "Uploading..."
              : type.type === "edit"
              ? "Saving..."
              : "Loading..."
          }
        />
      )}
      <form className={"flex flex-col w-full grow"} onSubmit={onSubmit}>
        <QuestionFormHeader />
        <QuestionFormMainContent />
        <div className="flex justify-center w-full">
          <Button
            type="submit"
            variant="outlined"
            className={btnContainerClasses.join(" ")}
            sx={{
              minHeight: "unset",
              textTransform: "none",
              minWidth: "unset",
            }}
          >
            {type.type === "create" && (
              <>
                <FileUploadOutlined className="mr-3" />
                Upload
              </>
            )}
            {type.type === "edit" && (
              <>
                <SaveOutlinedIcon className="mr-3" />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionEditForm;
