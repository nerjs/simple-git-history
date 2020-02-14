import { useState, useCallback, useEffect } from 'react'
import useSubscriber from '../useSubscriber'
import { LOG_CLEAR, LOG_LIST, LOG_LOAD } from '../../../../../utils/events'
import { ipcRenderer } from 'electron'

export default ({ currentRepo }) => {
    const [logs, setLogs] = useState([])

    useSubscriber({
        [LOG_CLEAR]: () => setLogs([]),
        [LOG_LIST]: (_, list) => setLogs(list),
    })

    const loadLogs = useCallback(() => ipcRenderer.send(LOG_LOAD), [])

    useEffect(() => loadLogs(), [loadLogs, currentRepo])

    return { logs }
}
