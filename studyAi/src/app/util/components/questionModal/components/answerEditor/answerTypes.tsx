import {Radio, RadioGroup, Checkbox} from '@mui/material'
import styles from "../leftContent/leftContentStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const MultipleChoice = () => {
    return (
        <RadioGroup className="mt-2" defaultValue="outlined" name="radio-buttons-group">
            <RadioInput id="1"/>
            <RadioInput id="2"/>
            <RadioInput id="3"/>
            <RadioInput id="4"/>
            <NewAnswer answerType="multipleChoice"/>
        </RadioGroup>
    )
}

export const SelectAll = () => {
    return (
        <>
            <CheckboxInput id="1" />
            <CheckboxInput id="2" />
            <CheckboxInput id="3" />
            <CheckboxInput id="4" />
        </>
    )
}


export const ShortAnswer = () => {
    return (
        <>
            <textarea className="mt-4 bg-gray-50 border border-light-on-secondary-container text-Black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[215px] max-h-[215px]"/>
        </>
    )
}

const RadioInput = ({id}:{id: string}) => {
    return (
        <div className="flex my-2 px-4 items-center">
            <Radio value={id} />
            <input type="text" id={id} className={styles.input({})} />
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