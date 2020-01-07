import { useState, useEffect, useRef, useCallback } from 'react'

const useDDHeader = () => {
    const [active, setActive] = useState(false)
    const [minWidth, setMinWidth] = useState(0)
    const [offsetLeft, setOffsetLeft] = useState(0)
    const refContainer = useRef()
    const refButton = useRef()

    const swithActive = useCallback(() => setActive(a => !a), [setActive])

    const handleClick = useCallback(
        e => {
            if (!e || !refContainer.current || !active) return

            const { target } = e
            if (refContainer.current.contains(target)) return
            if (refButton.current && refButton.current.contains(target)) return

            setActive(false)
        },
        [refContainer, refButton, active, setActive],
    )

    useEffect(() => {
        window.addEventListener('click', handleClick, true)
        return () => window.removeEventListener('click', handleClick)
    })

    useEffect(() => {
        if (!refButton.current) return
        const { x, width } = refButton.current.getBoundingClientRect()
        setMinWidth(width)
        setOffsetLeft(x)
    }, [refButton, setMinWidth, setOffsetLeft])

    return { active, swithActive, refContainer, refButton, minWidth, offsetLeft }
}

export default useDDHeader
