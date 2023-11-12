import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { QuestionProps } from '../../questionEditModal'
import type { AnswerOption } from '../../../../../../../prisma/generated/type-graphql'
import {ObjectId} from 'bson'
import { v4 as uuid } from "uuid";

export const MultipleChoice = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const options = questionData.questionInfo?.options as AnswerOption[];
    const answer = questionData.answer?.correctAnswer;
    const [radioValue, setRadioValue] = answer && answer[0] ? useState(answer[0].id) : useState("");
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((e.target as HTMLInputElement).value);
        setQuestionData({...questionData, answer: {correctAnswer: [options[Number((e.target as HTMLInputElement).value)]]}})
    }

    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group" value={radioValue} onChange={handleRadioChange}>
            {options.map((_option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat({id: options[index].id, value: event.target.value}).concat(options.slice(index+1)) 
                    setQuestionData(questionData.questionInfo ? {...questionData, questionInfo: {...questionData.questionInfo, options: newOptions}}: questionData)
                }
                return (
                    <div key={`radio-${index}`} className="flex my-2 px-4 items-center">
                        <Radio value={options[index].id} />
                        <input value={options[index].value} type="text" className={styles.input({})} onChange={handleInputChange} />
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
    
    return (
        <>
            {questionData.questionInfo?.options.map((option, index) => {
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newOptions = options.slice(0, index).concat({id: option.id, value: event.target.value}).concat(options.slice(index+1)) 
                    setQuestionData(questionData.questionInfo ? {...questionData, questionInfo: {...questionData.questionInfo, options: newOptions}}: questionData);
                }
                const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const currentAnswer = questionData.answer
                    if (!isChecked(option.id)) {
                        setQuestionData(currentAnswer ? {...questionData, answer: {correctAnswer: currentAnswer.correctAnswer.concat({id: option.id, value: event.target.value})}}: questionData)
                    }else {
                        const newCorrectAnswers: AnswerOption[] = [];
                        questionData?.answer?.correctAnswer.forEach((answer) => {
                            if (answer.id != option.id) {
                                newCorrectAnswers.push(answer)
                            }
                        })
                        setQuestionData(newCorrectAnswers ? {...questionData, answer: {correctAnswer: newCorrectAnswers}}: questionData)
                    }
                };
                const isChecked = (id: string) => {
                    let checked = false;
                    questionData.answer?.correctAnswer.forEach((answer) => {
                        if (answer.id == id) {
                            checked = true;
                        }
                    })
                    return checked;
                }
                return (
                    <div key={`select-${index}`} className="flex my-4 px-4 items-center">
                        <Checkbox value={options[index].value} checked={isChecked(options[index].id)} onChange={handleCheckboxChange} />
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
        const newAnswer = {id: questionData.answer?.correctAnswer[0].id as string, value: event.target.value}
        setQuestionData({...questionData, answer: {correctAnswer: [newAnswer]}})
    }
    return (
        <textarea className={styles.input({isTextArea: true})} value={questionData.answer?.correctAnswer[0]?.value} onChange={changeHandler} />
    )
}

const NewAnswer = ({questionData, setQuestionData} : Pick<QuestionProps, "questionData" | "setQuestionData">) => {
    const clickHandler = () => {
        const options = questionData.questionInfo?.options
        const questionInfo = questionData.questionInfo
        setQuestionData(options && questionInfo ? {...questionData, questionInfo: {...questionInfo, options: options.concat({id: uuid(), value: ""})}} : questionData)
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