const fs = require('fs')
const path = require('path')
const debounce = require('debounce')

const REMOVE = Symbol('remove')
const watchers = new Map()

const getWatcher = pathname => {
    if (watchers.has(pathname)) return watchers.get(pathname)

    const watcher = fs.watch(pathname, { recursive: true, persistent: false })

    const removeHandler = () => {
        if (watcher.listeners('change').length > 0) return
        watcher.removeListener(REMOVE, removeHandler)
        watchers.delete(pathname)
        watcher.close()
    }

    watcher.on(REMOVE, removeHandler)

    watchers.set(pathname, watcher)

    return watcher
}

module.exports = (pathname, cb, ignoreFiles = []) => {
    const results = new Map()

    const handlerDb = debounce(() => {
        const data = [].concat(
            ...[...results.keys()].map(event =>
                [...results.get(event)].map(file => ({
                    event,
                    pathname: path.join(pathname, file),
                })),
            ),
        )

        results.clear()
        cb(data)
    }, 100)

    const handler = (event, ptn) => {
        if (
            ignoreFiles &&
            (ignoreFiles.indexOf(ptn) >= 0 || ignoreFiles.indexOf(path.join(pathname, ptn)) >= 0)
        )
            return

        results.set(event, (results.get(event) || new Set()).add(ptn))
        handlerDb()
    }

    const watcher = getWatcher(pathname)

    watcher.on('change', handler)

    return () => {
        watcher.removeListener('change', handler)
        watcher.emit(REMOVE)
    }
}
