const queryString = require('query-string')
const GitError = require('./error')

class GitQuery {
    constructor(str) {
        if (!str || typeof str !== 'string') throw new TypeError('The query string is not a string')
        this.str = str
        this.hasGit = /^git/.test(this.str)
    }

    toString() {
        return `${this.hasGit ? '' : 'git '}${this.str}`
    }

    parse(str) {
        const { stdout, stderr } = typeof str === 'string' ? { stdout: str } : str
        return {
            message: (stderr || stdout || '').trim(),
            details: stderr ? (stdout || '').trim() || null : null,
        }
    }

    parseError(err, pathname) {
        return new GitError(err, pathname, this.toString())
    }
}

module.exports = GitQuery
