import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const MultipleChoice = ({choices, setChoices} : {choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>}) => {
    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group">
            {choices.map((choice, index) => {
                return (
                    <RadioInput initialValue={choice} id={index.toString()}/>
                )
            })}
            <NewAnswer choices={choices} setChoices={setChoices}/>
        </RadioGroup>
    )
}

export const SelectAll = ({choices, setChoices} : {choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>}) => {
    return (
        <>
            <CheckboxInput id="1" />
            <CheckboxInput id="2" />
            <CheckboxInput id="3" />
            <CheckboxInput id="4" />
            <NewAnswer choices={choices} setChoices={setChoices} />
        </>
    )
}


export const ShortAnswer = () => {
    return (
        <>
            <textarea className={styles.input({isTextArea: true})}/>
        </>
    )
}

const RadioInput = ({id, initialValue}:{initialValue: string, id: string}) => {
    return (
        <div className="flex my-2 px-4 items-center">
            <Radio value={id} />
            <input value={initialValue} type="text" id={id} className={styles.input({})} />
            <FontAwesomeIcon icon={faTrash} className="ml-2"/>
        </div>
    )
}

const CheckboxInput = ({id}:{id: string}) => {
    return (
        <div className="flex my-4 px-4 items-center">
            <Checkbox value={id} />
            <input type="text" id={id} className={styles.input({})} />
            <FontAwesomeIcon icon={faTrash} className="ml-2"/>
        </div>
    )
}

const NewAnswer = ({choices, setChoices}: {choices: string[] ,setChoices: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const clickHandler = () => {
        setChoices([...choices, ""])
    }
    
    return (
        <button onClick={clickHandler} className="ml-4 my-2 px-4 items-center">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-3 text-md font-semibold">New Answer</span>
        </button>
    )
}