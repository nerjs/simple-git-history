import { useState, useEffect } from 'react'
import createGraphLines from './createGraphLines'

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

        arr.forEach(createGraphLines(ng, lines, minIndex, maxIndex, height))

        setGraphs(ng)
    }, [setGraphs, maxIndex, minIndex, arr, lines, width, height, top])

    return graphs
}
