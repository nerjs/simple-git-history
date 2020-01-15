import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

export default schema => {
    useEffect(() => {
        Object.keys(schema).forEach(key => ipcRenderer.on(key, schema[key]))

        return () =>
            Object.keys(schema).forEach(key => ipcRenderer.removeListener(key, schema[key]))
    }, [])
}
