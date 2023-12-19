"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import useWindowWidth from "@/app/util/hooks/useWindowWidth";

const LinkedInIcon = () => {
    const windowWidth = useWindowWidth();

    return (
        <FontAwesomeIcon className="m-1 sm:m-2" size={windowWidth > 640 ? "xl": undefined} icon={faLinkedin} />
    )
}

export default LinkedInIcon;