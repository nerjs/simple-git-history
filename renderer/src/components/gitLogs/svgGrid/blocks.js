import styled, { css, keyframes } from 'styled-components'
import { getColor } from '../../../data/theme'

const showAnimate = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const showMixin = css`
    animation: ${showAnimate} 0.5s linear;
`

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

export const Layer = styled.g``

export const LinesGridPaths = styled.line.attrs(({ offset, height }) => ({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: height,
    style: {
        transform: `translateX(${offset}px)`,
    },
}))`
    stroke: #959da522;
    stroke-width: 2px;
    /* transition: 0.3s; */
    ${showMixin}
`

export const GraphPathSvg = styled.path`
    stroke: ${({ color }) => color};
    stroke-width: 2px;
    fill: transparent;
    ${showMixin}
`

export const GraphCircleSvg = styled.circle`
    ${({ color }) => css`
        stroke: ${color};
        fill: ${color};
    `}
    ${showMixin}
`
