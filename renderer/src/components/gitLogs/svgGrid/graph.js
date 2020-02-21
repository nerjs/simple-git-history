import React, { useState, useEffect } from 'react'
import { Layer, GraphPathSvg } from './blocks'
import GraphPath from './graphPath'
import useGraph from './useGraph'

const buildPath = (from, to, path = []) => {
    let str = `M ${from[0]},${from[1]}`

    path.forEach(([x1, y1, x2, y2, x3, y3]) => {
        str += `L ${x1},${y1} Q ${x2},${y2} ${x3},${y3}`
    })

    str += `L ${to[0]},${to[1]}`
    return str
}

const Graph = props => {
    const graphs = useGraph(props)
    // let d = ''

    // graphs.forEach(({ from, to, path, color, key }) => {
    //     d += ' ' + buildPath(from, to, path)
    // })

    // console.log(d)

    // return <GraphPathSvg color="red" d={d} />

    return (
        <Layer>
            {graphs.map(({ from, to, path, color, key }) => (
                <GraphPath
                    key={key}
                    fromX={from[0]}
                    fromY={from[1]}
                    toX={to[0]}
                    toY={to[1]}
                    path={buildPath(from, to, path)}
                    color={color}
                />
            ))}
        </Layer>
    )
}

export default Graph
