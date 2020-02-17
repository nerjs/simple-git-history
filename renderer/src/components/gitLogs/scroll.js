import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollContainer, ScrollInnerContainer, CommitBlock, CommitInnerBlock } from './blocks'

const BLOCK_HEIGHT = 25

const ScrolledLogs = ({ logs }) => {
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
    }, [outerRef, setHeight])

    const handleScroll = useCallback(
        ({ target }) =>
            setOffset(o => {
                if (Math.abs(o - target.scrollTop) < 10) return o
                return target.scrollTop
            }),
        [innerRef, setOffset],
    )

    const checkSizeData = () => {
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
    }

    useEffect(checkSizeData, [height, offset, logs, setPaddings, setArr])

    useEffect(() => {
        if (logs.length) {
            setCols(Math.max(...logs.map(({ line }) => line)) + 1)
        } else {
            setCols(1)
        }
    }, [setCols, logs])

    return (
        <ScrollContainer onScroll={handleScroll} ref={outerRef}>
            <ScrollInnerContainer ref={innerRef} paddings={paddings}>
                {arr.map(({ hash, short, line }) => (
                    <CommitBlock key={hash} height={BLOCK_HEIGHT}>
                        <CommitInnerBlock maxLines={cols} line={line}>
                            {short}
                        </CommitInnerBlock>
                    </CommitBlock>
                ))}
            </ScrollInnerContainer>
        </ScrollContainer>
    )
}

export default ScrolledLogs
