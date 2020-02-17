import styled from 'styled-components'
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
    overflow: auto;

    ${scrollDecorate}
`

export const ScrollInnerContainer = styled.div.attrs(({ paddings }) => ({
    style: {
        paddingTop: paddings.top,
        paddingBottom: paddings.bottom,
    },
}))``

export const CommitBlock = styled.div`
    margin: 0;
    width: calc(100% - 80px);
    margin: 0px auto;
    /* border: 1px solid; */
    text-align: center;
    position: relative;
    height: ${({ height }) => height}px;
`
export const CommitInnerBlock = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${({ maxLines, line }) => (100 / maxLines) * (line + 1)}%;
    display: inline-block;
    padding: 5px 10px;
    background-color: #fff1;
    color: ${getColor('primary')};
    transform: translateX(-50%);

    & span {
        padding: 2px 5px;
        margin: 5px 5px;
        border: 1px solid #0006;
    }
`
