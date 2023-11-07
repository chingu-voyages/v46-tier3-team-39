"use client"

import { useState } from "react";
import QuestionEditForm from "./Modal"
import { Modal } from "@mui/material";
import { Question } from "../../../../../prisma/generated/type-graphql";

const QuestionModalWrapper = ({children, questionData} : {children: React.ReactNode, questionData?: Partial<Question>}) => {

    const [isOpen, setIsOpen] = useState(false);
    const styles = {
        modal: [
            "flex",
            "justify-center",
            "items-center",
            "w-10/12",
            "h-[80vh]",
            "m-auto",
        ].join(" ")
    }
    return (
        <div>
            <div onClick={() => setIsOpen(true)}>{children}</div>
            <Modal open={isOpen} className={styles.modal} onClose={() => setIsOpen(false)}>
                <QuestionEditForm setIsOpen={setIsOpen} questionData = {questionData} />
            </Modal>
        </div>
    )
}

export default QuestionModalWrapper;