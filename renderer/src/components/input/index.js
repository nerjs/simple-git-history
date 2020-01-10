import styled from 'styled-components'
import { getColor, getSize } from '../../data/theme'

export const Input = styled.input`
    box-shadow: none;
    outline: none;
    padding: 2px 10px;
    width: auto;
`

export const TextInput = styled(Input)`
    border: 1px solid ${getColor('borderHeader')};
    width: 100%;
    font-size: ${getSize('text')};
    background-color: ${getColor('bcInput')};
    color: ${getColor('secondary')};
`
