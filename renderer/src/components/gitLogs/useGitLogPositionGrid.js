import { useState, useEffect, useRef, useCallback } from 'react'

export const BLOCK_HEIGHT = 25

export default ({ logs, sidebarWidth }) => {
    const [cols, setCols] = useState(0)
    const innerRef = useRef()
    const outerRef = useRef()
    const [height, setHeight] = useState(0)
    const [offset, setOffset] = useState(0)
    const [paddings, setPaddings] = useState({ top: 0, bottom: 0 })
    const [arr, setArr] = useState([])

    useEffect(() => {
        const resizeHandler = () => setHeight(outerRef.current.clientHeight)
        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => window.removeEventListener('resize', resizeHandler)
    }, [outerRef, setHeight, sidebarWidth])

    const handleScroll = useCallback(
        ({ target }) =>
            setOffset(o => {
                if (Math.abs(o - target.scrollTop) < 10) return o
                return target.scrollTop
            }),
        [innerRef, setOffset],
    )

    useEffect(() => {
        const countOffset = offset < height ? 0 : parseInt((offset - height) / BLOCK_HEIGHT)
        const countRows = parseInt((height * 3 + BLOCK_HEIGHT) / BLOCK_HEIGHT)
        const pTop = countOffset * BLOCK_HEIGHT
        const resultArr = logs.slice(countOffset, countOffset + countRows)

        setArr(prevArr => {
            if (prevArr.length !== resultArr.length) return resultArr
            if (!prevArr.length) return prevArr
            if (
                prevArr[0] === resultArr[0] &&
                prevArr[prevArr.length - 1] === resultArr[resultArr.length - 1]
            )
                return prevArr
            return resultArr
        })

        setPaddings(prevPaddings => {
            const pBottom = (logs.length - countOffset - resultArr.length) * BLOCK_HEIGHT
            if (prevPaddings.top === pTop && prevPaddings.bottom === pBottom) return prevPaddings

            return {
                top: pTop,
                bottom: pBottom,
            }
        })
    }, [height, offset, logs, setPaddings, setArr])

    useEffect(() => {
        if (logs.length) {
            setCols(Math.max(...logs.map(({ line }) => line)) + 1)
        } else {
            setCols(1)
        }
    }, [setCols, logs])

    return { handleScroll, outerRef, innerRef, paddings, arr, cols }
}
