import { useState, useCallback } from 'react'
import useSubscriber from '../useSubscriber'
import {
    CLEAR_BRANCHES,
    LIST_BRANCHES,
    CURRENT_BRANCH,
    ADD_BRANCH,
    CHECKOUT_BRANCH,
    REMOVE_BRANCH,
} from '../../../../../utils/events'
import { ipcRenderer } from 'electron'

export default () => {
    const [currentBranch, setCurrentBranch] = useState(null)
    const [listBranches, setListBranches] = useState([])

    useSubscriber({
        [CLEAR_BRANCHES]: () => {
            setCurrentBranch(null)
            setListBranches([])
        },
        [LIST_BRANCHES]: (_, list) => setListBranches(list),
        [CURRENT_BRANCH]: (_, br) => setCurrentBranch(br),
    })

    const addBranch = useCallback(name => ipcRenderer.send(ADD_BRANCH, name), [])

    const checkoutBranch = useCallback(name => ipcRenderer.send(CHECKOUT_BRANCH, name))

    const removeBaranch = useCallback(name => ipcRenderer.send(REMOVE_BRANCH, name))

    return { currentBranch, listBranches, addBranch, checkoutBranch, removeBaranch }
}
