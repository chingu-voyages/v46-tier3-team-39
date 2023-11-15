"use client";
import QuestionEditForm from "./questionEditModal";
import { IconButton, Modal } from "@mui/material";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { ElementPosProvider } from "../../providers/elementPosProvider";
import {
  QuestionModalProvider,
  useQuestionModal,
} from "./context/questionModalProvider";
const defaultModalClasses = ["flex", "items-center", "justify-center"];
const QuestionModal = ({ children }: { children: React.ReactNode }) => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const {
    type,
    isOpen,
    setIsOpen,
    questionData,
    currElPos,
    closeHandler,
    setQuestionData,
  } = modalData;
  const currModalClasses = [...defaultModalClasses];
  if (type.layout === "modal")
    currModalClasses.push(
      "min-w-[90%]",
      "md:min-w-[60%]",
      "lg:min-w-[40%]",
      "xl:min-w-[30%]",
      "max-h-[80%]"
    );
  else currModalClasses.push("w-full min-h-full");
  const styles = {
    modal: currModalClasses.join(" "),
  };
  return (
    <>
      <IconButton type={"button"} onClick={() => setIsOpen(true)}>
        {children}
      </IconButton>
      <Modal
        ref={currElPos ? currElPos.setRef : null}
        open={isOpen}
        className={styles.modal}
        onClose={closeHandler}
      >
        <QuestionEditForm
          closeHandler={closeHandler}
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </Modal>
    </>
  );
};
const QuestionModalContainer = ({
  children,
  type = {
    type: "edit",
    layout: "page",
  },
  initialQuestionData,
}: {
  initialQuestionData?: Partial<Question>;
  children: React.ReactNode;
  type?: { type: "edit" | "create"; layout: "modal" | "page" };
}) => {
  return (
    <QuestionModalProvider
      type={type}
      initialQuestionData={initialQuestionData}
    >
      <QuestionModal>{children}</QuestionModal>
    </QuestionModalProvider>
  );
};
const QuestionModalWrapper = ({
  children,
  initialQuestionData,
  type = {
    type: "edit",
    layout: "page",
  },
}: {
  children: React.ReactNode;
  type?: { type: "edit" | "create"; layout: "modal" | "page" };
  initialQuestionData?: Partial<Question>;
}) => {
  return (
    <ElementPosProvider>
      <QuestionModalContainer
        type={type}
        initialQuestionData={initialQuestionData}
      >
        {children}
      </QuestionModalContainer>
    </ElementPosProvider>
  );
};

export default QuestionModalWrapper;
