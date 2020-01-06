import { createGlobalStyle } from 'styled-components'
import { getSize, getColor } from './theme'

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
        background-color: ${getColor('backgroundBody')};
    }
`

export default GlobalStyles
