const EE = require('events')
const path = require('path')
const gitUrlParse = require('git-url-parse')
const exec = require('./utils/exec')

class Git extends EE {
    constructor(pathname) {
        super()
        this.pathname = pathname
    }

    async git(str) {
        const res = await exec(`git --git-dir=${path.join(this.pathname, '.git')} ${str}`)

        if (res.stderr) throw new Error(res.stderr)

        return res.stdout
    }

    async getUrl(natural) {
        const naturalUrl = await this.git('config --get remote.origin.url')

        if (natural) return naturalUrl

        return gitUrlParse.stringify(gitUrlParse(naturalUrl), 'https')
    }
}

module.exports = Git
