"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LeftContent from './components/leftContent/leftContent'
import AnswerEditor from './components/answerEditor/answerEditor'
import Controls from './components/controls'
import styles from './ModalStyles'
import { useQuestions } from '@/app/stores/questionStore'

const QuestionEditForm = ({questionId, setIsOpen}: {questionId?: string, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const questionData = questionId ? useQuestions()[0].data[questionId]: undefined;
    
    return (
        <div className={styles.modal}>
            <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => setIsOpen(false)}/>
            <h1 className={styles.h1}>Question Editor</h1>
            <Controls setIsOpen={setIsOpen} />
            <div className={styles.contentLayout}>
                <LeftContent questionData={questionData}/>
                <AnswerEditor initialChoices={questionData ? [""] : ["","","",""]}/>
            </div>
        </div>
    )
}

export default QuestionEditForm;