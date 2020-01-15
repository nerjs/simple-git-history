const EE = require('events')
const path = require('path')
const gitUrlParse = require('git-url-parse')
const exec = require('../../utils/exec')
const {
    PATHNAME,
    WATCHED,
    EVENT_ERROR,
    EVENT_GIT,
    START_WATCH,
    END_WATCH,
    CHANGE,
} = require('./utils/constants')

class CoreGit extends EE {
    constructor(pathname) {
        super()
        this[PATHNAME] = pathname
        this[WATCHED] = false
    }

    get pathname() {
        return this[PATHNAME]
    }

    get watched() {
        return this[WATCHED]
    }

    set pathname(np) {
        let canWatch = false
        if (this.watched) {
            this.watchEnd()
            canWatch = true
        }
        this[PATHNAME] = np

        if (canWatch) this.watch()
    }

    async git(str) {
        const res = await exec(`git --git-dir=${path.join(this.pathname, '.git')} ${str}`)

        if (res.stderr) {
            const err = new Error(res.stderr)
            this.emit(EVENT_ERROR, err)
            throw err
        }

        this.emit(EVENT_GIT, res.stdout)

        return res.stdout
    }

    async getUrl(natural) {
        const naturalUrl = await this.git('config --get remote.origin.url')

        if (natural) return naturalUrl

        return gitUrlParse.stringify(gitUrlParse(naturalUrl), 'https')
    }

    watch() {
        this[WATCHED] = true
        this.emit(START_WATCH, this.pathname)
    }

    watchEnd() {
        this[WATCHED] = false
        this.emit(END_WATCH, this.pathname)
    }
}

module.exports = CoreGit
