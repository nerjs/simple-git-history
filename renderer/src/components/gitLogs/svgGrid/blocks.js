import styled from 'styled-components'
import { getColor } from '../../../data/theme'

export const Svg = styled.svg.attrs(({ width, height, top }) => ({
    width,
    height,
    style: {
        width,
        height,
        top,
    },
}))`
    position: absolute;
    /* top: 0; */
    /* background-color: #fff1; */
`

export const LinesGridLayer = styled.g``

export const LinesGridPaths = styled.line.attrs(({ offset, height }) => ({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: height,
    style: {
        transform: `translateX(${offset}px)`,
    },
}))`
    stroke: ${getColor('secondary')};
    stroke-width: 2px;
    transition: 0.3s;
    opacity: 0.2;
`
