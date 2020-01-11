import { useEffect, useState, useReducer, useCallback } from 'react'
import { ipcRenderer } from 'electron'
import {
    START,
    REPOS_LOAD,
    LIST_REPOS,
    CURRENT_REPO,
    ADD_REPO,
    CHANGE_CURRENT_REPO,
    ADD_REPO_IN_LIST,
    CHANGE_REPO,
    REMOVE_REPO,
    SELECT_REPO,
} from '../../../../utils/events'
import reposListReducer from './reposListReducer'

export default () => {
    const [reposLoad, setReposLoad] = useState(false)
    const [reposLoaded, setReposLoaded] = useState(false)
    const [currentRepo, setCurrentRepo] = useState(null)
    const [listRepos, dispatchList] = useReducer(reposListReducer, [])

    useEffect(() => {
        const allEvents = {
            [REPOS_LOAD]: (_, l) => {
                setReposLoad(!!l)
                if (!l && !reposLoaded) setReposLoaded(true)
            },
            [CURRENT_REPO]: (_, cr) => setCurrentRepo(cr),
            [LIST_REPOS]: (_, list) => dispatchList({ type: LIST_REPOS, payload: list }),
            [CHANGE_CURRENT_REPO]: (_, str) => setCurrentRepo(str),
            [ADD_REPO_IN_LIST]: (_, payload) => dispatchList({ type: ADD_REPO_IN_LIST, payload }),
            [CHANGE_REPO]: (_, payload) => dispatchList({ type: CHANGE_REPO, payload }),
            [REMOVE_REPO]: (_, payload) => dispatchList({ type: REMOVE_REPO, payload }),
        }

        Object.keys(allEvents).forEach(key => ipcRenderer.on(key, allEvents[key]))

        ipcRenderer.send(START)

        return () =>
            Object.keys(allEvents).forEach(key => ipcRenderer.removeListener(key, allEvents[key]))
    }, [])

    const addRepo = useCallback(strPath => ipcRenderer.send(ADD_REPO, strPath), [])
    const selectRepo = useCallback(strPath => ipcRenderer.send(SELECT_REPO, strPath), [])
    const removeRepo = useCallback(strPath => ipcRenderer.send(REMOVE_REPO, strPath), [])

    return { reposLoad, reposLoaded, currentRepo, listRepos, addRepo, selectRepo, removeRepo }
}
