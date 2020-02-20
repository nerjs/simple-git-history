import React, { useState, useEffect } from 'react'
import { Svg } from './blocks'
import { BLOCK_HEIGHT } from '../useGitLogPositionGrid'
import LinesGrid from './linesGrid'
import Graph from './graph'

const SvgGrid = ({ arr = [], lines, top, width }) => {
    const [height, setHeight] = useState(arr.length * BLOCK_HEIGHT)

    useEffect(() => setHeight(arr.length * BLOCK_HEIGHT), [arr, setHeight])

    return (
        <Svg width={width} height={height} top={top}>
            <LinesGrid lines={lines} height={height} />
            <Graph lines={lines} arr={arr} width={width} height={height} top={top} />
        </Svg>
    )
}

export default SvgGrid
