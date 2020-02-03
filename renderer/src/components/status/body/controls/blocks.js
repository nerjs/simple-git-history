import styled, { keyframes } from 'styled-components'
import { StatusBodyItem } from '../blocks'
import { getColor } from '../../../../data/theme'
import { BtnSecondary } from '../../../btn'

export const StatusControlsItem = styled(StatusBodyItem)`
    font-size: 10px;
    padding: 5px;
    display: flex;
    flex-direction: ${({ wrapBtns }) => (wrapBtns ? 'row' : 'column')};
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
`

export const EmptyBlock = styled.div`
    padding: 5px;
    text-align: center;
    box-shadow: 0 -2px 2px ${getColor('secondary')};
    color: ${getColor('secondary')};
    font-size: 10px;
`

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const ControlsBtn = styled(BtnSecondary)`
    font-size: 10px;
    width: 100%;
    margin: 3px 5px;
    border-radius: 3px;

    & svg {
        margin-left: 10px;
        animation: ${spin} 1s linear infinite;
    }
`
