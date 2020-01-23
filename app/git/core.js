const EE = require('events')
const gitUrlParse = require('git-url-parse')
const exec = require('../../utils/exec')
const watcher = require('./utils/watcher')
const GitQuery = require('./utils/query')

const {
    PATHNAME,
    WATCHED,
    STOP_WATCH,
    WATCH_CACHE,
    ERROR,
    GIT,
    DESTROY,
    START_WATCH,
    END_WATCH,
    CHANGE,
    INNER_CHANGE,
} = require('./utils/constants')

class CoreGit extends EE {
    constructor(pathname) {
        super()
        this[PATHNAME] = pathname
        this[STOP_WATCH] = null
        this[WATCH_CACHE] = new Map()
    }

    get pathname() {
        return this[PATHNAME]
    }

    get watched() {
        return this[WATCHED]
    }

    async git(str, ignoreParse) {
        const query = str instanceof GitQuery ? str : new GitQuery(str)

        try {
            const res = await exec(`cd ${this.pathname} && ${query}`)
            const parsed = query.parse(res)
            this.emit(GIT, parsed)

            return ignoreParse ? res.stdout || res.stderr : parsed
        } catch (e) {
            const err = query.parseError(e, this.pathname)
            this.emit(ERROR, err)
            throw err
        }
    }

    async getUrl(natural) {
        const naturalUrl = await this.git('config --get remote.origin.url')

        if (natural) return naturalUrl

        return gitUrlParse.stringify(gitUrlParse(naturalUrl), 'https')
    }

    watch(strQuery, cb) {
        if (!this[WATCHED]) {
            this[STOP_WATCH] = watcher(this.pathname, files => {
                this.emit(INNER_CHANGE)
                this.emit(CHANGE, files)
            })
            this[WATCHED] = true
            this.emit(START_WATCH)
        }

        const query = strQuery instanceof GitQuery ? strQuery : new GitQuery(strQuery)
        const watchEventName = Symbol.for(`${query}`)

        if (!this[WATCH_CACHE].has(watchEventName)) {
            const watchHandler = async () => {
                const newData = await this.git(query, true)
                const cache = this[WATCH_CACHE].get(watchEventName)
                const { prevData } = cache
                if (prevData === newData) return

                this[WATCH_CACHE].set(watchEventName, { ...cache, prevData: newData })
                if (prevData === null) return

                this.emit(watchEventName, query.parse(prevData), query.parse(newData))
            }

            this[WATCH_CACHE].set(watchEventName, {
                prevData: null,
                watchHandler,
            })

            this.git(query, true).then(r => {
                if (!this[WATCH_CACHE].has(watchEventName)) return
                const cache = this[WATCH_CACHE].get(watchEventName)
                if (cache.prevData) return
                this[WATCH_CACHE].set(watchEventName, { ...cache, prevData: r })
            })

            this.on(INNER_CHANGE, watchHandler)
        }

        if (cb && typeof cb === 'function') this.on(watchEventName, cb)

        const stopWatch = () => this.stopWatch(strQuery, cb)
        stopWatch.eventName = watchEventName

        return stopWatch
    }

    stopWatch(strQuery, cb) {
        const watchEventName = Symbol.for(`${strQuery}`)
        if (!this[WATCHED] || !this[WATCH_CACHE].has(watchEventName)) return

        if (cb) {
            this.removeListener(watchEventName, cb)
        } else {
            this.removeAllListeners(watchEventName)
        }

        if (this.listeners(watchEventName).length > 0) return

        const { watchHandler } = this[WATCH_CACHE].get(watchEventName)
        this[WATCH_CACHE].delete(watchEventName)
        this.removeListener(INNER_CHANGE, watchHandler)

        if (this[WATCH_CACHE].size > 0) return

        this[STOP_WATCH]()
        this[STOP_WATCH] = null
        this[WATCHED] = false
        this.emit(END_WATCH)
    }

    destroy() {
        this.stopWatch()
        this.emit(DESTROY, this.pathname)
        this.eventNames().forEach(eventName => this.removeAllListeners(eventName))
    }
}

module.exports = CoreGit
