import React from 'react'
import GlobalStyles from './globalStyles'
import Theme from './theme'
import { ApiProvider } from './api'

const DataWrapper = ({ children }) => {
    return (
        <Theme>
            <GlobalStyles />
            <ApiProvider>{children || null}</ApiProvider>
        </Theme>
    )
}

export default DataWrapper
