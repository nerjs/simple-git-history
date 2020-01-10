import React, { createContext, useState, useCallback, useContext } from 'react'
import AddRepoModal from './modal'
import { useApi } from '../../../data/api'

const AddRepoContext = createContext({})

export const AddRepoProvider = ({ children }) => {
    const [openAddRepo, setOpenAddRepo] = useState(false)
    const switchAddRepo = useCallback(() => setOpenAddRepo(o => !o), [setOpenAddRepo])
    const { addRepo, currentRepo } = useApi()

    return (
        <AddRepoContext.Provider value={{ openAddRepo, setOpenAddRepo, switchAddRepo }}>
            {children}
            {openAddRepo && (
                <AddRepoModal
                    switchOpen={switchAddRepo}
                    addRepo={addRepo}
                    currentRepo={currentRepo}
                />
            )}
        </AddRepoContext.Provider>
    )
}

export const useAddRepo = () => useContext(AddRepoContext)
