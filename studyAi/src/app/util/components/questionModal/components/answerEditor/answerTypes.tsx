import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { QuestionProps } from '../../questionEditModal'
import { AnswerData, QuestionInfoData } from '@prisma/client'
import type { AnswerOption } from '../../../../../../../prisma/generated/type-graphql'
import { ObjectId } from 'bson'

export const MultipleChoice = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as AnswerOption[];
    const answer = questionData.answer;
    const [radioValue, setRadioValue] = useState(Number(answer?.correctAnswer[0]));
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(Number((e.target as HTMLInputElement).value));
        setQuestionData({...questionData, answer: {correctAnswer: [options[Number((e.target as HTMLInputElement).value)]]}})
    }

    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group" value={radioValue} onChange={handleRadioChange}>
            {options.map((_option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat({id: String(index), value: event.target.value}).concat(options.slice(index+1)) 
                    setQuestionData(questionData.questionInfo ? {...questionData, questionInfo: {...questionData.questionInfo, options: newOptions}}: questionData)
                }
                return (
                    <div key={`radio-${index}`} className="flex my-2 px-4 items-center">
                        <Radio value={index} />
                        <input id={String(index)} value={options[index].value} type="text" className={styles.input({})} onChange={handleInputChange} />
                        <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(index), {questionData, setQuestionData} )}/>
                    </div>
                )
            })}
            <NewAnswer questionData={questionData} setQuestionData={setQuestionData} />
        </RadioGroup>
    )
}

export const SelectAll = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as AnswerOption[];
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentAnswer = questionData.answer
        if (event.target.checked) {
            setQuestionData(currentAnswer ? {...questionData, answer: {correctAnswer: currentAnswer.correctAnswer.concat({id: event.target.id, value: event.target.value})}}: questionData)
        }else {
            setQuestionData(currentAnswer ? {...questionData, answer: {correctAnswer: currentAnswer.correctAnswer.toSpliced(Number(event.target.id), 1)}}: questionData)
        }
    };
    return (
        <>
            {questionData.questionInfo?.options.map((_option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat({id: event.target.id, value: event.target.value}).concat(options.slice(index+1)) 
                    setQuestionData(questionData.questionInfo ? {...questionData, questionInfo: {...questionData.questionInfo, options: newOptions}}: questionData);
                }
                return (
                    <div key={`select-${index}`} className="flex my-4 px-4 items-center">
                        <Checkbox value={options[index].value} checked={questionData.answer?.correctAnswer.includes(options[index])} onChange={handleCheckboxChange} />
                        <input type="text" className={styles.input({})} value={options[index].value} onChange={handleInputChange} />
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
        setQuestionData({...questionData, answer: {correctAnswer: [{id: "0", value: event.target.value}]}})
    }
    return (
        <textarea className={styles.input({isTextArea: true})} value={questionData.answer?.correctAnswer[0].value} onChange={changeHandler} />
    )
}

const NewAnswer = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const clickHandler = () => {
        const options = questionData.questionInfo?.options
        const questionInfo = questionData.questionInfo
        setQuestionData(options && questionInfo ? {...questionData, questionInfo: {...questionInfo, options: options.concat({id: "2", value: ""})}} : questionData)
    }
    
    return (
        <button onClick={clickHandler} className="ml-4 my-2 px-4 items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-3 text-md font-semibold">New Answer</span>
        </button>
    )
}

const deleteChoice = (index: number, {questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options
    const currentOption = options ? options[index] : undefined
    const answerIndex = currentOption && questionData.answer ? questionData.answer.correctAnswer.indexOf(currentOption) : -1
    let newAnswer = questionData.answer
    if (newAnswer && answerIndex != -1) {
        newAnswer.correctAnswer = newAnswer.correctAnswer.toSpliced(answerIndex, 1)
    } 
    setQuestionData(questionData.questionInfo && options ? {...questionData, questionInfo: {...questionData.questionInfo, options: options.toSpliced(index, 1)}, answer: newAnswer}: questionData)
}