import styled from 'styled-components'
import { getSize, getColor } from '../../data/theme'

const LayerDD = styled.div`
    position: fixed;
    top: ${getSize('headerHeight')};
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${getColor('overlayHeader')};
    z-index: 100;
`

export default LayerDD
