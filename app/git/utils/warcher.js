const fs = require('fs')
const path = require('path')
const debounce = require('debounce')

module.exports = (pathname, cb) => {
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
        results.set(event, (results.get(event) || new Set()).add(ptn))
        handlerDb()
    }

    const watcher = fs.watch(pathname, { recursive: true })

    watcher.on('change', handler)

    return () => {
        watcher.removeListener('change', handler)
        watcher.close()
    }
}
