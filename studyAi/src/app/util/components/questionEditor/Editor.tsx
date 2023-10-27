"use client"

import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LeftContent from './components/leftContent'
import AnswerEditor from './components/answerEditor'

const QuestionEditor = () => {

    const [open, setOpen] = useState(true);
    const modalBackground = "bg-light-secondary-container"
    const modalLayout = "absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-192 py-16 px-16"
    const modalBorder = "rounded-4xl border border-light-on-secondary-container outline-none"
    const styles = [modalBackground, modalLayout, modalBorder];
    let modalStyle = ""
    styles.forEach((style: string) => {modalStyle = modalStyle + " " + style})

    return (
        <Modal
            open={open}
        >
            <Box className={modalStyle}>
                <FontAwesomeIcon icon={faXmark} className="absolute top-8 right-8" onClick={() => setOpen(false)} />
                <h1 className="text-7xl text-center mb-8">Question Editor</h1>
                <Box className="flex justify-center">
                    <LeftContent />
                    <AnswerEditor />
                </Box>
                {/* Controls here */}
            </Box>
        </Modal>
    )
}

export default QuestionEditor