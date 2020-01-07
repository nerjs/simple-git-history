import React, { createContext, useContext } from 'react'
import useApiMain from './useApiMain'

const ApiContext = createContext({})

export const ApiProvider = ({ children }) => {
    const mainValue = useApiMain()
    return <ApiContext.Provider value={mainValue}>{children || null}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
