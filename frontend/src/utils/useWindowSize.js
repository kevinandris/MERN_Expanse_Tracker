// ! 6 for the orb to move in different screen sizes

import { useEffect, useState } from "react"

export const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    // trigger this function whenever the screen size changes
    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', updateSize)

        // clean up
        return () => window.removeEventListener('resize', updateSize)
    }, [])


    // return an object
    return {
        width: size[0],
        height: size[1]
    }
}