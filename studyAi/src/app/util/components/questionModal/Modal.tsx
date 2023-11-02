"use client"

import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LeftContent from './components/leftContent/leftContent'
import AnswerEditor from './components/answerEditor/answerEditor'
import Controls from './components/controls'
import { Question } from '@prisma/client'
import styles from './ModalStyles'

const QuestionEditor = ({Question} : {Question?: Partial<Question> | undefined}) => {

    const [open, setOpen] = useState(true);

    return (
        <Modal open={open}>
            <div className={styles.modal}>
                <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => setOpen(false)} />
                <h1 className={styles.h1}>Question Editor</h1>
                <div className={styles.contentLayout}>
                    <LeftContent />
                    <AnswerEditor />
                </div>
                <Controls />
            </div>
        </Modal>
    )
}

export default QuestionEditor