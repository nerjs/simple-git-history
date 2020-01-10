import styled from 'styled-components'
import { getColor } from '../../../data/theme'
import { TextInput } from '../../input'

export const AddRepoContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${getColor('overlayAddModal')};
    z-index: 1;
`

export const AddRepoBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-width: 80vw;
    background-color: ${getColor('bcBody')};
    z-index: 2;
    /* box-shadow: 0 0 5px #0009; */
`

export const Close = styled.div`
    cursor: pointer;

    & svg {
        color: ${getColor('secondary')};
    }
`

export const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
`

export const MetaTop = styled(Meta)`
    border-bottom: 1px solid ${getColor('borderHeader')};
`
export const MetaBottom = styled(Meta)`
    border-top: 1px solid ${getColor('borderHeader')};
`

export const MetaTitle = styled.h3`
    font-size: 14px;
`

export const Input = styled(TextInput)`
    width: 100%;
    margin-right: 10px;
`
