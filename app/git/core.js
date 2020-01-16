const EE = require('events')
const path = require('path')
const gitUrlParse = require('git-url-parse')
const exec = require('../../utils/exec')
const GitError = require('./utils/error')
const {
    PATHNAME,
    WATCHED,
    ERROR,
    GIT,
    DESTROY,
    START_WATCH,
    END_WATCH,
    CHANGE,
} = require('./utils/constants')

class CoreGit extends EE {
    constructor(pathname) {
        super()
        this[PATHNAME] = pathname
    }

    get pathname() {
        return this[PATHNAME]
    }

    get watched() {
        return this[WATCHED]
    }

    async git(str) {
        try {
            const res = await exec(`cd ${this.pathname} && git ${str}`)
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

    destroy() {
        this.emit(DESTROY, this.pathname)
        this.eventNames().forEach(eventName => this.removeAllListeners(eventName))
    }
}

module.exports = CoreGit
