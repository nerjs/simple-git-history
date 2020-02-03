import { useState, useCallback } from 'react'
import {
    CLEAR_STATUS,
    UPDATE_STATUS,
    FETCH_LOADING,
    PUSH_LOADING,
    PULL_LOADING,
    PULL_REQUEST,
    FETCH_REQUEST,
    PUSH_REQUEST,
} from '../../../../../utils/events'
import useSubscriber from '../useSubscriber'
import { ipcRenderer } from 'electron'

const createDef = () => ({
    row: [],
    head: null,
    upstream: null,
    ahead: 0,
    behind: 0,
    index: {},
    work: {},
    untracked: [],
    conflicts: [],
})

export default () => {
    const [status, setStatus] = useState(createDef())
    const [statusLoaders, setStatusLoaders] = useState({ fetch: false, pull: false, push: false })

    useSubscriber({
        [CLEAR_STATUS]: () => setStatus(createDef()),
        [UPDATE_STATUS]: (_, us) => setStatus(us),
        [FETCH_LOADING]: (_, l) => setStatusLoaders(loaders => ({ ...loaders, fetch: !!l })),
        [PULL_LOADING]: (_, l) => setStatusLoaders(loaders => ({ ...loaders, pull: !!l })),
        [PUSH_LOADING]: (_, l) => setStatusLoaders(loaders => ({ ...loaders, push: !!l })),
    })

    const fetch = useCallback(() => ipcRenderer.send(FETCH_REQUEST), [])
    const pull = useCallback(() => ipcRenderer.send(PULL_REQUEST), [])
    const push = useCallback(() => ipcRenderer.send(PUSH_REQUEST), [])

    return { status, statusLoaders, fetch, pull, push }
}
