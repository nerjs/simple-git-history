import React from 'react'
import GlobalStyles from './globalStyles'

const DataWrapper = ({ children }) => {
    return (
        <>
            <GlobalStyles />
            {children || null}
        </>
    )
}

export default DataWrapper
