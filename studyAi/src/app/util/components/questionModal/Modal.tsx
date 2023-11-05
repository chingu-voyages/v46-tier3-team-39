"use client"

import Modal from '@mui/material/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LeftContent from './components/leftContent/leftContent'
import AnswerEditor from './components/answerEditor/answerEditor'
import Controls from './components/controls'
import styles from './ModalStyles'
import { useQuestions } from '@/app/stores/questionStore'
import { useState } from 'react'

const QuestionModal = ({questionId}: {questionId?: string}) => {

    const questionData = questionId ? useQuestions()[0].data[questionId]: undefined;
    const [isOpen, setIsOpen] = useState(true)
    
    return (
        <Modal
            open={isOpen}
        >
            <div className={styles.modal}>
                <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => setIsOpen(false)} />
                <h1 className={styles.h1}>Question Editor</h1>
                <div className={styles.contentLayout}>
                    <LeftContent questionData={questionData}/>
                    <AnswerEditor />
                </div>
                <Controls />
            </div>
        </Modal>
    )
}

export default QuestionModal;