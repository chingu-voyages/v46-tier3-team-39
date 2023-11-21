"use client";
import ContainerBar, { Container } from "../../page/server/containerBar";
import capitalizeEveryWord from "@/app/util/parsers/capitalizeEveryWord";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuestions } from "@/app/stores/questionStore";
import { containerTabs, InnerContainer } from "../server/questionViewContainer";
import BtnLabelDropdown from "@/app/util/components/btnLabelDropdown/btnLabelDropdown";
import QuestionModalWrapper from "@/app/util/components/questionModal/questionModalWrapper";
import { useQuestionId } from "../../../context/QuestionIdContext";
import { useMutation } from "@apollo/client";
import { DeleteQuestionMutation } from "@/gql/mutations/questionMutation";
import {
  Alert,
  Button,
  IconButton,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const EditBtn = ({
  btnStyles,
  btnClassNames,
  questionId,
}: {
  btnStyles: React.CSSProperties;
  btnClassNames: string;
  questionId: string;
}) => {
  const [questionData, { addOrUpdateItems }] = useQuestions();
  const questions = questionData.data;
  const question = questions.map[questionId];
  if (!question) return <></>;
  return (
    <BtnLabelDropdown text="Edit Question" pointerEvents={false}>
      {(props) => (
        <QuestionModalWrapper
          initialQuestionData={question}
          onSave={(newQuestion) => {
            addOrUpdateItems([{ ...newQuestion, id: questionId }]);
          }}
          type={{
            type: "edit",
            layout: "modal",
          }}
        >
          {(modalProps) => (
            <IconButton
              type="button"
              ref={props.setAnchorEl}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") props.handleClick(e);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") props.handleClose();
              }}
              sx={btnStyles}
              className={btnClassNames + " aspect-square h-[70%]"}
              onClick={modalProps.onClick}
            >
              <EditIcon className="text-base" />
            </IconButton>
          )}
        </QuestionModalWrapper>
      )}
    </BtnLabelDropdown>
  );
};
const DeleteBtn = ({
  btnStyles,
  btnClassNames,
  questionId,
}: {
  btnStyles: React.CSSProperties;
  btnClassNames: string;
  questionId: string;
}) => {
  const router = useRouter();
  const [questionData, { deleteItems }] = useQuestions();
  const questions = questionData.data;
  const question = questions.map[questionId];
  const [open, setOpen] = useState(false);
  const [mutationQuery, { loading, error, data }] = useMutation(
    DeleteQuestionMutation
  );
  const session = useSession();
  const userId = session.data?.user?.id;
  if (!question) return <></>;
  const onDelete = async () => {
    try {
      if (loading) return;
      await mutationQuery({
        variables: {
          id: questionId,
          userId: userId ? userId : "",
        },
      });
      deleteItems([questionId]);
      setOpen(false);
      router.push(`/library/${userId}/questions`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BtnLabelDropdown text="Delete Question" pointerEvents={false}>
      {(props) => (
        <>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col justify-center space-y-6 px-[4%] py-[2.5%] bg-White text-Black">
              <Typography variant="h6">Delete Question</Typography>
              <Alert severity="warning"> You cannot undo this action </Alert>
              <Typography
                variant="subtitle1"
                className="tracking-normal text-sm"
              >
                {" "}
                {`Are you sure you want to delete`}{" "}
                {`"${question.questionInfo?.title}" ?`}
              </Typography>

              <Button
                variant={"outlined"}
                color={"error"}
                sx={{
                  textTransform: "unset",
                }}
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </Modal>
          <IconButton
            type="button"
            ref={props.setAnchorEl}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") props.handleClick(e);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") props.handleClose();
            }}
            sx={btnStyles}
            className={btnClassNames + " aspect-square h-[70%]"}
            onClick={() => setOpen(true)}
          >
            <DeleteOutlineIcon className="text-base" />
          </IconButton>
        </>
      )}
    </BtnLabelDropdown>
  );
};
const TopBar = ({
  view,
  handleChange,
}: {
  view: (typeof containerTabs)[number];
  handleChange: (
    event: React.SyntheticEvent,
    newValue: (typeof containerTabs)[number]
  ) => void;
}) => {
  const session = useSession();
  const questions = useQuestions()[0].data;
  const questionIdData = useQuestionId();
  const questionId = questionIdData?.questionId;
  const question =
    questionId && typeof questionId === "string"
      ? questions.map[questionId]
      : null;
  const btnStyles: React.CSSProperties = {
    textTransform: "none",
    padding: 0,
    margin: 0,
    minHeight: "unset",
  };
  const btnClassNames = "flex items-center justify-center";
  return (
    <ContainerBar border>
      <Tabs
        value={view}
        onChange={handleChange}
        aria-label="question-options"
        className="[&_.MuiTabs-flexContainer]:h-full"
        sx={{
          height: "100%",
          minHeight: "unset",
        }}
      >
        {containerTabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            className={
              btnClassNames +
              " h-full text-xs md:text-sm min-w-[4.5rem] md:min-w-[5.5rem]"
            }
            label={capitalizeEveryWord(tab)}
            sx={btnStyles}
          />
        ))}
      </Tabs>
      {session.data &&
        question &&
        session.data.user.id === question.creatorId && (
          <div className="h-full flex space-x-0 items-center grow justify-end">
            <EditBtn
              btnClassNames={btnClassNames}
              btnStyles={btnStyles}
              questionId={question.id}
            />

            <DeleteBtn
              btnClassNames={btnClassNames}
              btnStyles={btnStyles}
              questionId={question.id}
            />
          </div>
        )}
    </ContainerBar>
  );
};
export const QuestionContainer = ({ height }: { height?: string | number }) => {
  const [view, setView] =
    useState<(typeof containerTabs)[number]>("description");
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: (typeof containerTabs)[number]
  ) => setView(newValue);
  return (
    <Container
      style={{ height: height ? height + "px" : undefined }}
      fullHeight={false}
      className="max-h-[max(30rem,45vh)] md:max-h-none md:w-[calc(50%-0.5rem)] md:mr-2 grow"
      border
    >
      <TopBar view={view} handleChange={handleChange} />
      <InnerContainer view={view} />
    </Container>
  );
};
export default QuestionContainer;
