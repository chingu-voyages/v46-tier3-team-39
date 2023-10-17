"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

const CubeIcon = ({size}: {size: string}) => {
    return (
        <FontAwesomeIcon className={`text-${size}`} icon={faCube}/>
    )
}

export default CubeIcon;