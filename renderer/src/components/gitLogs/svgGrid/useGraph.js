import { useState, useEffect } from 'react'
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../useGitLogPositionGrid'

const HALF_HEIGHT = (BLOCK_HEIGHT * 0.75) / 2
const HALF_WIDTH = BLOCK_WIDTH / 2

const getColor = () => '#d1d5da'

const getPoint = (lines, line, index, minIndex, pos) => {
    const center = [lines.get(line), (index - minIndex) * BLOCK_HEIGHT + BLOCK_HEIGHT / 2]

    switch (pos) {
        case 'top':
            return [center[0], center[1] - HALF_HEIGHT]
        case 'right':
            return [center[0] + HALF_WIDTH, center[1]]
        case 'bottom':
            return [center[0], center[1] + HALF_HEIGHT]
        case 'left':
            return [center[0] - HALF_WIDTH, center[1]]
    }

    return center
}

export default ({ arr, lines, width, height, top }) => {
    const [graphs, setGraphs] = useState([])
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)

    useEffect(() => {
        setMinIndex(arr.length ? arr[0].index : 0)
        setMaxIndex(arr.length ? arr[arr.length - 1].index : 0)
    }, [setMinIndex, setMaxIndex, arr])

    useEffect(() => {
        if (!arr || !arr.length || !lines.size) {
            setGraphs(prevG => (prevG.length ? [] : prevG))
            return
        }

        const ng = []

        const item = arr[parseInt(arr.length / 2)]

        ;['top', 'right', 'bottom', 'left'].forEach(pos => {
            ng.push({
                key: pos,
                from: getPoint(lines, item.line, item.index, minIndex, pos),
                to: getPoint(lines, item.line, item.index, minIndex, pos),
                color: 'red',
            })
        })

        console.log(item.short, ng)

        arr.forEach(item => {
            // if (!item.children || !item.children.length) return;
            // item.children.forEach(cItem => {
            //     if
            // })
        })

        setGraphs(ng)
    }, [setGraphs, maxIndex, minIndex, arr, lines, width, height, top])

    return graphs
}
