import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { QuestionProps } from '../../questionEditModal'
import { QuestionInfoData } from '@prisma/client'

export const MultipleChoice = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as string[];

    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group">
            {options.map((option, index) => {
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat(event.target.value).concat(options.slice(index+1)) 
                    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: newOptions}})
                }
                return (
                    <div key={`radio-${index}`} className="flex my-2 px-4 items-center">
                        <Radio value={index} />
                        <input value={options[index]} type="text" className={styles.input({})} onChange={handleChange} />
                        <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(index), {questionData, setQuestionData} )}/>
                    </div>
                )
            })}
            <NewAnswer questionData={questionData} setQuestionData={setQuestionData} />
        </RadioGroup>
    )
}

export const SelectAll = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as string[];
    return (
        <>
            {questionData.questionInfo?.options.map((option, index) => {
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat(event.target.value).concat(options.slice(index+1)) 
                    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: newOptions}})
                }
                return (
                    <div key={`select-${index}`} className="flex my-4 px-4 items-center">
                        <Checkbox value={index} />
                        <input type="text" className={styles.input({})} value={options[index]} onChange={handleChange} />
                        <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(index), {questionData, setQuestionData})}/>
                    </div>
                )
            })}
            <NewAnswer questionData={questionData} setQuestionData={setQuestionData} />
        </>
    )
}


export const ShortAnswer = () => {
    return (
        <textarea className={styles.input({isTextArea: true})}/>
    )
}

const NewAnswer = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const clickHandler = () => {
        setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: [...questionData.questionInfo?.options as string[], ""]}})
    }
    
    return (
        <button onClick={clickHandler} className="ml-4 my-2 px-4 items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-3 text-md font-semibold">New Answer</span>
        </button>
    )
}

const deleteChoice = (index: number, {questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as string[]
    
    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: options.toSpliced(index, 1)}})
}