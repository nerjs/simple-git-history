const queryString = require('query-string')

class GitQuery {
    constructor(str, format) {
        if (!str || typeof str !== 'string') throw new TypeError('The query string is not a string')
        this.str = str.trim()
        this.format = format
        this.hasGit = /^git/.test(this.str)
        this.hasInlineFormat = /\s--format=/.test(this.str)
    }

    toString() {
        return `${this.hasGit ? '' : 'git '}${this.str}${
            this.hasInlineFormat || !this.format
                ? ''
                : ` --format="${queryString.stringify(this.format)}"`
        }`
    }

    parse(str) {
        if (!this.hasInlineFormat && !this.format) return str

        const res = str
            .split('\n')
            .map(s => s.trim())
            .filter(s => !!s)

        return this.hasInlineFormat || !this.format ? res : res.map(s => queryString.parse(s))
    }
}

module.exports = GitQuery
