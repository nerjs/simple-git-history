import React from 'react'
import { ThemeProvider } from 'styled-components'
import colors from './colors'
import sizes from './sizes'
import fontFamily from './fontFamily'
export * from './helpers'

const theme = {
    colors,
    sizes,
    fontFamily,
}

const Theme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
