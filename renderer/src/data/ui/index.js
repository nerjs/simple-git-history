import React, { createContext, useState, useEffect, useContext } from 'react'
import { useApi } from '../api'

const UiContext = createContext({})

export const UiProvider = ({ children }) => {
    const [activeCommit, setActiveCommit] = useState(null)
    const { logs } = useApi()

    useEffect(() => setActiveCommit(null), [logs])

    return (
        <UiContext.Provider value={{ activeCommit, setActiveCommit }}>
            {children}
        </UiContext.Provider>
    )
}

export default () => useContext(UiContext)
