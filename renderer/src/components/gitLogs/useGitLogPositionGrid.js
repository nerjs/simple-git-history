import { useState, useEffect, useRef, useCallback } from 'react'
import { useDebounce } from 'react-use'

export const BLOCK_WIDTH = 80
export const BLOCK_HEIGHT = parseInt(BLOCK_WIDTH * 0.4)

export default ({ logs, sidebarWidth }) => {
    const innerRef = useRef()
    const outerRef = useRef()
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [offset, setOffset] = useState(0)
    const [paddings, setPaddings] = useState({ top: 0, bottom: 0 })
    const [arr, setArr] = useState([])
    const [lines, setLines] = useState(new Map())

    useEffect(() => {
        const resizeHandler = () => {
            setHeight(outerRef.current.clientHeight)
            setWidth(outerRef.current.clientWidth)
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => window.removeEventListener('resize', resizeHandler)
    }, [outerRef, setHeight, setWidth, sidebarWidth])

    const handleScroll = useCallback(
        ({ target }) =>
            setOffset(o => {
                if (Math.abs(o - target.scrollTop) < height / 4) return o
                return target.scrollTop
            }),
        [innerRef, setOffset, height],
    )

    useDebounce(
        () => {
            const countOffset = offset < height ? 0 : parseInt((offset - height) / BLOCK_HEIGHT)
            const countRows = parseInt((height * 3 + BLOCK_HEIGHT) / BLOCK_HEIGHT)
            const pTop = countOffset * BLOCK_HEIGHT
            const resultArr = logs.slice(countOffset, countOffset + countRows)

            setArr(prevArr => {
                if (
                    prevArr.length !== resultArr.length ||
                    !prevArr.length ||
                    !resultArr.length ||
                    prevArr[0] !== resultArr[0] ||
                    prevArr[prevArr.length - 1] !== resultArr[resultArr.length - 1]
                )
                    return resultArr

                return prevArr
            })

            setLines(prevLines => {
                const nLinesSet = new Set()
                resultArr.forEach(({ line }) => nLinesSet.add(line))
                const nLines = new Map()
                const sectionLines = parseInt(width / (nLinesSet.size + 1))
                ;[...nLinesSet]
                    .sort((a, b) => a - b)
                    .forEach((l, i) => nLines.set(l, (i + 1) * sectionLines))

                return nLines
            })

            setPaddings(prevPaddings => {
                const pBottom = (logs.length - countOffset - resultArr.length) * BLOCK_HEIGHT
                if (prevPaddings.top === pTop && prevPaddings.bottom === pBottom)
                    return prevPaddings

                return {
                    top: pTop,
                    bottom: pBottom,
                }
            })
        },
        5,
        [height, width, offset, logs, setPaddings, setArr, setLines],
    )

    return { handleScroll, outerRef, innerRef, paddings, arr, lines, width, height }
}
