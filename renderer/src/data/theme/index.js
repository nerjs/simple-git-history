import React from 'react'
import { ThemeProvider } from 'styled-components'
import colors from './colors'
import sizes from './sizes'
export * from './helpers'

const theme = {
    colors,
    sizes,
}

const Theme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
