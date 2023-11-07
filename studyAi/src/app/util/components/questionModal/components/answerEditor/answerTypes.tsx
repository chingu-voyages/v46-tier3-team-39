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
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    setChoices(choices.slice(0, index).concat(event.target.value).concat(choices.slice(index+1)))
                }
                return (
                    <RadioInput key={index} initialValue={choice} id={index.toString()} choices={choices} setChoices={setChoices} onChange={(e) => handleChange(e)} />
                )
            })}
            <NewAnswer choices={choices} setChoices={setChoices}/>
        </RadioGroup>
    )
}

export const SelectAll = ({choices, setChoices} : {choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>}) => {
    return (
        <>
            {choices.map((choice, index) => {
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    setChoices(choices.slice(0, index).concat(event.target.value).concat(choices.slice(index+1)))
                }
                return (
                    <CheckboxInput key={index} initialValue={choice} id={index.toString()} choices={choices} setChoices={setChoices} onChange={(e) => handleChange(e)}/>
                )
            })}
            <NewAnswer choices={choices} setChoices={setChoices} />
        </>
    )
}


export const ShortAnswer = () => {
    return (
        <textarea className={styles.input({isTextArea: true})}/>
    )
}

const RadioInput = ({id, initialValue, choices, setChoices, onChange}:{initialValue: string, id: string, choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>, onChange: React.ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <div className="flex my-2 px-4 items-center">
            <Radio value={id} />
            <input value={initialValue} type="text" id={id} className={styles.input({})} onChange={onChange} />
            <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(id), choices, setChoices)}/>
        </div>
    )
}

const CheckboxInput = ({id, initialValue, choices, setChoices, onChange}:{initialValue: string, id: string, choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>, onChange: React.ChangeEventHandler<HTMLInputElement>}) => {
    return (
        <div className="flex my-4 px-4 items-center">
            <Checkbox value={id} />
            <input type="text" id={id} className={styles.input({})} value={initialValue} onChange={onChange} />
            <FontAwesomeIcon icon={faTrash} className="ml-2 hover:cursor-pointer" onClick={() => deleteChoice(Number(id), choices, setChoices)}/>
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

const deleteChoice = (index: number, choices: string[], setChoices: React.Dispatch<React.SetStateAction<string[]>>) => {
    setChoices(choices.toSpliced(index, 1));
}