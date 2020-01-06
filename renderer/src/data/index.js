import React from 'react'
import GlobalStyles from './globalStyles'
import Theme from './theme'

const DataWrapper = ({ children }) => {
    return (
        <Theme>
            <GlobalStyles />
            {children || null}
        </Theme>
    )
}

export default DataWrapper
