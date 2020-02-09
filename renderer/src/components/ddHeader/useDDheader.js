import { useState, useEffect, useRef, useCallback } from 'react'

const useDDHeader = () => {
    const [active, setActive] = useState(false)
    const [leftOffset, setLeftOffset] = useState(0)
    const [minWidth, setMinWidth] = useState(0)
    const [isRight, setIsRight] = useState(false)
    const refButton = useRef()
    const refContainer = useRef()

    const switchActive = useCallback(() => setActive(a => !a), [setActive])

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
    }, [active])

    const checkPosition = () => {
        const { left, width } = refButton.current.getBoundingClientRect()
        setLeftOffset(left)
        setMinWidth(width)
        if (active && refContainer.current) {
            const rect = refContainer.current.getBoundingClientRect()
            setIsRight(window.document.body.clientWidth - left - rect.width <= 0)
        } else {
            setIsRight(false)
        }
    }

    useEffect(() => checkPosition(), [active, setLeftOffset, setMinWidth, refButton])

    useEffect(() => {
        if (!active) return
        const observer = new MutationObserver(() => checkPosition())

        observer.observe(refContainer.current, {
            characterData: true,
            childList: true,
            subtree: true,
        })

        return () => observer.disconnect()
    }, [active, refContainer])

    return { active, switchActive, refButton, leftOffset, minWidth, refContainer, isRight }
}

export default useDDHeader
