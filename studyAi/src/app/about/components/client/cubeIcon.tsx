"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import type { SizeProp } from '@fortawesome/fontawesome-svg-core'

const CubeIcon = ({size}: {size?: SizeProp | undefined}) => {
    return (
        <FontAwesomeIcon size={size} icon={faCube}/>
    )
}

export default CubeIcon;