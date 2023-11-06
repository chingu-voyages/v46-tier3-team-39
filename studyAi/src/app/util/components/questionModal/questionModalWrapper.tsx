"use client"

import { useState } from "react";
import QuestionEditForm from "./Modal"
import { Modal } from "@mui/material";

const QuestionModalWrapper = ({children, questionId} : {children: React.ReactNode, questionId?: string}) => {

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
        <>
            <button onClick={() => setIsOpen(true)}>{children}</button>
            <Modal open={isOpen} className={styles.modal} onClose={() => setIsOpen(false)}>
                <QuestionEditForm questionId={questionId} setIsOpen={setIsOpen}/>
            </Modal>
        </>
    )
}

export default QuestionModalWrapper;