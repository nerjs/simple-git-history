import React, { useState, useEffect } from 'react'
import { GraphPathSvg, GraphCircleSvg } from './blocks'

const buildPath = (from, to, path = []) => {
    let str = `M ${from[0]},${from[1]}`

    path.forEach(([x1, y1, x2, y2, x3, y3]) => {
        str += `L ${x1},${y1} Q ${x2},${y2} ${x3},${y3}`
    })

    str += `L ${to[0]},${to[1]}`
    return str
}

const GraphPath = ({ from, to, path, color }) => {
    const [dPath, setDPath] = useState('')

    useEffect(() => setDPath(buildPath(from, to, path)), [setDPath, from, to, path])

    return (
        <>
            <GraphCircleSvg cx={from[0]} cy={from[1]} r={3} color={color} />
            <GraphPathSvg d={dPath} color={color} />
            <GraphCircleSvg cx={to[0]} cy={to[1]} r={3} color={color} />
        </>
    )
}

export default GraphPath
