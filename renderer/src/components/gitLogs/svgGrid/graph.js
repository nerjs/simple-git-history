import React, { useState, useEffect } from 'react'
import { Layer } from './blocks'
import GraphPath from './graphPath'
import useGraph from './useGraph'

const Graph = props => {
    const graphs = useGraph(props)

    return (
        <Layer>
            {graphs.map(({ from, to, path, color, key }) => (
                <GraphPath key={key} from={from} to={to} path={path} color={color} />
            ))}
        </Layer>
    )
}

export default Graph
