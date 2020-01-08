import styled from 'styled-components'
import { getColor, getSize } from '../../data/theme'

export const Btn = styled.button`
    padding: 5px 10px;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    background-color: ${getColor('bcBody')};
    border: 1px solid ${getColor('border')};
    color: ${getColor('primary')};
    font-size: ${getSize('text')};
    cursor: pointer;

    &:active,
    &:focus {
        box-shadow: none;
        outline: none;
    }

    &[disabled] {
        cursor: default;
    }
`

export const BtnPrimary = styled(Btn)`
    color: #fff;
    padding: 5px 15px;
    background-color: #1047a9;

    &:hover {
        background-color: #0c3683;
        box-shadow: 0 1px 5px #0008;
        border-radius: 3px;
    }

    &:active {
        box-shadow: 0 0 2px #0004;
    }
`

export const BtnSecondary = styled(Btn)`
    background-color: #2f363d;
    border: 1px solid #111;

    &:hover {
        border: 1px solid #ddd;
    }

    &:active {
        border: 1px solid #999;
    }
`
