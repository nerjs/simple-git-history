const EE = require('events')
const gitUrlParse = require('git-url-parse')
const exec = require('../../utils/exec')
const GitError = require('./utils/error')
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

    async git(str) {
        const query = str instanceof GitQuery ? str : new GitQuery(str)

        try {
            const res = await exec(`cd ${this.pathname} && ${query}`)
            this.emit(GIT, res.stdout || res.stderr)

            return res.stdout || res.stderr
        } catch (e) {
            const err = new GitError(e, this.pathname, str)
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

        const watchEventName = Symbol.for(`${strQuery}`)

        if (!this[WATCH_CACHE].has(watchEventName)) {
            const watchHandler = async () => {
                const newData = await this.git(strQuery)
                const cache = this[WATCH_CACHE].get(watchEventName)
                const { prevData } = cache
                if (prevData === newData) return

                this[WATCH_CACHE].set(watchEventName, { ...cache, prevData: newData })
                if (prevData === null) return

                this.emit(watchEventName, prevData, newData)
            }

            this[WATCH_CACHE].set(watchEventName, {
                prevData: null,
                watchHandler,
            })

            this.git(strQuery).then(r => {
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
