import { useState, useCallback, useEffect } from 'react'
import useSubscriber from '../../useSubscriber'
import { LOG_CLEAR, LOG_LIST, LOG_LOAD } from '../../../../../../utils/events'
import { ipcRenderer } from 'electron'
import prepareList from './prepare'

export default ({ currentRepo }, { currentBranch }) => {
    const [logs, setLogs] = useState([])

    useSubscriber({
        [LOG_CLEAR]: () => setLogs([]),
        [LOG_LIST]: (_, list) => setLogs(prepareList(list)),
    })

    const loadLogs = useCallback(() => ipcRenderer.send(LOG_LOAD), [])

    useEffect(() => loadLogs(), [loadLogs, currentRepo, currentBranch])

    return { logs }
}
