import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { QuestionProps } from '../../questionEditModal'
import { AnswerData, QuestionInfoData } from '@prisma/client'

export const MultipleChoice = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as string[];
    const answer = questionData.answer as AnswerData
    const [radioValue, setRadioValue] = useState(Number(answer.correctAnswer[0]));
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(Number((e.target as HTMLInputElement).value));
        setQuestionData({...questionData, answer: {correctAnswer: [options[Number((e.target as HTMLInputElement).value)]]}})
    }

    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group" value={radioValue} onChange={handleRadioChange}>
            {options.map((_option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat(event.target.value).concat(options.slice(index+1)) 
                    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: newOptions}})
                }
                return (
                    <div key={`radio-${index}`} className="flex my-2 px-4 items-center">
                        <Radio value={options[index]} />
                        <input value={options[index]} type="text" className={styles.input({})} onChange={handleInputChange} />
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
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentAnswer = questionData.answer as AnswerData
        if (event.target.checked) {
            setQuestionData({...questionData, answer: {correctAnswer: currentAnswer.correctAnswer.concat(event.target.value)}})
        }else {
            const index = currentAnswer.correctAnswer.indexOf(event.target.value)
            setQuestionData({...questionData, answer: {correctAnswer: currentAnswer.correctAnswer.toSpliced(index, 1)}})
        }
    };
    return (
        <>
            {questionData.questionInfo?.options.map((_option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat(event.target.value).concat(options.slice(index+1)) 
                    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: newOptions}})
                }
                return (
                    <div key={`select-${index}`} className="flex my-4 px-4 items-center">
                        <Checkbox value={options[index]} checked={questionData.answer?.correctAnswer.includes(options[index])} onChange={handleCheckboxChange} />
                        <input type="text" className={styles.input({})} value={options[index]} onChange={handleInputChange} />
                        <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(index), {questionData, setQuestionData})}/>
                    </div>
                )
            })}
            <NewAnswer questionData={questionData} setQuestionData={setQuestionData} />
        </>
    )
}


export const ShortAnswer = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionData({...questionData, answer: {correctAnswer: [event.target.value]}})
    }
    return (
        <textarea className={styles.input({isTextArea: true})} value={questionData.answer?.correctAnswer} onChange={changeHandler} />
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
    const currentAnswer = questionData.answer as AnswerData
    const answerIndex = currentAnswer.correctAnswer.indexOf(String(index))
    let newAnswer = currentAnswer
    if (answerIndex != -1) {
        newAnswer.correctAnswer = newAnswer.correctAnswer.toSpliced(answerIndex, 1)
    } 
    setQuestionData({...questionData, questionInfo: {...questionData.questionInfo as QuestionInfoData, options: options.toSpliced(index, 1)}, answer: newAnswer})
}