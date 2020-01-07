import { createGlobalStyle } from 'styled-components'
import { getSize, getColor, getFF } from './theme'

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        margin: 0;
        padding: 0;
        font-size: ${getSize('text')};
        background-color: ${getColor('bcBody')};
        color: ${getColor('primary')};
        font-family: ${getFF('monospace')}
    }
`

export default GlobalStyles
