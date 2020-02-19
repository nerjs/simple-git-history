import React from 'react'
import { LinesGridLayer, LinesGridPaths } from './blocks'

const LinesGrid = ({ lines, height }) => {
    console.log(lines)
    ;[...lines].forEach(console.info)
    return (
        <LinesGridLayer>
            {[...lines].map(([line, offset]) => (
                <LinesGridPaths key={line} offset={offset} height={height} title="eee" />
            ))}
        </LinesGridLayer>
    )
}

export default LinesGrid
