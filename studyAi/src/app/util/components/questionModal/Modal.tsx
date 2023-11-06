"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LeftContent from './components/leftContent/leftContent'
import AnswerEditor from './components/answerEditor/answerEditor'
import Controls from './components/controls'
import styles from './ModalStyles'
import { Question } from '../../../../../prisma/generated/type-graphql'
import { ForwardedRef, forwardRef } from 'react'

interface Props {
    questionData?: Partial<Question>, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionEditForm = forwardRef((props: Props, ref: ForwardedRef<any>) => {

    const options = props.questionData?.questionInfo?.options
    
    return (
        <div className={styles.modal}>
            <FontAwesomeIcon icon={faXmark} className={styles.closeIcon} onClick={() => props.setIsOpen(false)}/>
            <h1 className={styles.h1}>Question Editor</h1>
            <Controls setIsOpen={props.setIsOpen} />
            <div className={styles.contentLayout}>
                <LeftContent questionData={props.questionData}/>
                <AnswerEditor initialChoices={options ? options : ["","","",""]}/>
            </div>
        </div>
    )
})

export default QuestionEditForm;