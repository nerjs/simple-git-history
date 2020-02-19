import styled, { css } from 'styled-components'
import { getColor } from '../../data/theme'
import scrollDecorate from '../appGrid/scrollDecorate'

const PosA = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

export const GitLogsContainer = styled(PosA)`
    overflow: hidden;
`

export const ScrollContainer = styled(PosA)`
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 100%;

    ${scrollDecorate}
`

export const ScrollInnerContainer = styled.div.attrs(({ paddings }) => ({
    style: {
        paddingTop: paddings.top,
        paddingBottom: paddings.bottom,
    },
}))`
    max-width: 100%;
    overflow: hidden;
`

export const CommitInnerBlock = styled.div.attrs(({ lineOffset }) => ({
    style: {
        left: lineOffset,
    },
}))`
    position: absolute;
    top: 50%;
    /* bottom: 3px; */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 85%;
    background-color: #fff1;
    color: ${getColor('primary')};
    transform: translate(-50%, -50%);
    transition: 0.3s;
`

export const CommitBlock = styled.div`
    margin: 0;
    width: 100%;
    margin: 0px auto;
    /* border: 1px solid; */
    text-align: center;
    position: relative;
    height: ${({ height }) => height}px;

    ${({ width, height }) => css`
        ${CommitInnerBlock} {
            max-height: ${height}px;
            height: ${parseInt(height * 0.75)}px;
            width: ${width}px;
            font-size: ${parseInt(width * 0.17)}px;
        }
    `}
`
