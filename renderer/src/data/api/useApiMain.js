import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { START, REPOS_LOAD } from '../../../../utils/events'

export default () => {
    const [reposLoad, setReposLoad] = useState(false)
    const [reposLoaded, setReposLoaded] = useState(false)

    useEffect(() => {
        ipcRenderer.on(REPOS_LOAD, (_, l) => {
            setReposLoad(!!l)
            if (!l && !reposLoaded) setReposLoaded(true)
        })

        ipcRenderer.send(START)
    }, [])

    return { reposLoad, reposLoaded }
}
