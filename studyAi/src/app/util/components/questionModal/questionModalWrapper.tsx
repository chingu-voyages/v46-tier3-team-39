"use client";
import QuestionEditForm from "./questionEditModal";
import { Modal } from "@mui/material";
import { Question } from "../../../../../prisma/generated/type-graphql";
import { ElementPosProvider } from "../../providers/elementPosProvider";
import {
  QuestionModalProvider,
  useQuestionModal,
} from "./context/questionModalProvider";
const defaultModalClasses = ["flex", "items-center", "justify-center"];
const QuestionModal = ({
  children,
}: {
  children: ({ onClick }: { onClick: () => void }) => React.ReactNode;
}) => {
  const modalData = useQuestionModal();
  if (!modalData) return <></>;
  const { type, isOpen, setIsOpen, closeHandler } = modalData;
  const currModalClasses = [...defaultModalClasses];
  const styles = {
    modal: currModalClasses.join(" "),
  };
  return (
    <>
      {type.layout === "modal" && (
        <>
          {children({ onClick: () => setIsOpen(true) })}
          <Modal open={isOpen} className={styles.modal} onClose={closeHandler}>
            <>
              <QuestionEditForm />
            </>
          </Modal>
        </>
      )}
      {type.layout === "page" && <QuestionEditForm />}
    </>
  );
};
const QuestionModalContainer = ({
  children,
  type = {
    type: "edit",
    layout: "modal",
  },
  initialQuestionData,
  onSave,
}: {
  initialQuestionData?: Partial<Question>;
  children: ({ onClick }: { onClick: () => void }) => React.ReactNode;
  type?: { type: "edit" | "create"; layout: "modal" | "page" };
  onSave?: (e: Partial<Question>) => void;
}) => {
  return (
    <QuestionModalProvider
      type={type}
      initialQuestionData={initialQuestionData}
      onSave={onSave}
    >
      <QuestionModal>{children}</QuestionModal>
    </QuestionModalProvider>
  );
};
const QuestionModalWrapper = ({
  children,
  initialQuestionData,
  onSave,
  type = {
    type: "edit",
    layout: "modal",
  },
}: {
  children: ({ onClick }: { onClick: () => void }) => React.ReactNode;
  type?: { type: "edit" | "create"; layout: "modal" | "page" };
  initialQuestionData?: Partial<Question>;
  onSave?: (e: Partial<Question>) => void;
}) => {
  return (
    <ElementPosProvider>
      <QuestionModalContainer
        type={type}
        initialQuestionData={initialQuestionData}
        onSave={onSave}
      >
        {children}
      </QuestionModalContainer>
    </ElementPosProvider>
  );
};

export default QuestionModalWrapper;
