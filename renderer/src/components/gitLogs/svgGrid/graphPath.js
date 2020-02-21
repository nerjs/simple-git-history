import React, { useState, useEffect, useMemo, memo } from 'react'
import { GraphPathSvg, GraphCircleSvg } from './blocks'

const GraphPath = ({ fromX, fromY, toX, toY, path, color }) => {
    return (
        <>
            <GraphCircleSvg cx={fromX} cy={fromY} r={2} color={color} />
            <GraphPathSvg d={path} color={color} />
            <GraphCircleSvg cx={toX} cy={toY} r={2} color={color} />
        </>
    )
}

export default memo(GraphPath)
