"use client"

import { createPortal } from "react-dom"
import QuestionModal from "./Modal"

const ModalOpenerWrapper = ({children, questionId} : {children: React.ReactNode, questionId?: string}) => {

    const clickHandler = () => {
        createPortal(<QuestionModal questionId={questionId} />, document.body)
    }
    return (
        <div onClick={clickHandler}>
            {children} 
        </div>
    )
}

export default ModalOpenerWrapper;