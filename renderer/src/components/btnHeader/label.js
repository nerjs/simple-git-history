import styled from 'styled-components'
import { getColor } from '../../data/theme'

const LabelHeader = styled.div`
    color: ${getColor('secondary')};
    font-size: 0.95em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export default LabelHeader
