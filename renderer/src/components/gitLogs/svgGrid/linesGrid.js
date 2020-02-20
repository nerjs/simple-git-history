import React from 'react'
import { Layer, LinesGridPaths } from './blocks'

const LinesGrid = ({ lines, height }) => {
    return (
        <Layer>
            {[...lines].map(([line, offset]) => (
                <LinesGridPaths key={line} offset={offset} height={height} title="eee" />
            ))}
        </Layer>
    )
}

export default LinesGrid
