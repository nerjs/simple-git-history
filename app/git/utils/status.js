class GitStatus {
    constructor(str) {
        if (typeof str !== 'string')
            throw new TypeError(`Argument GitStatus class must be string. (${str})`)
        this.str = str
        this.row = str.split('\n').filter(s => !!s && !!s.trim())
        this.head = null
        this.upstream = null
        this.ahead = 0
        this.behind = 0
        this.index = { ...this.createEmpty(), renamed: [] }
        this.work = this.createEmpty()
        this.untracked = []
        this.conflicts = []
        this.labels = GitStatus.NAMES

        this.parse()
    }

    static NAMES = {
        M: 'modified',
        A: 'added',
        D: 'deleted',
        R: 'renamed',
        C: 'copied',
        U: 'unmerged', // updated but unmerged
        '!': 'conflicts',
        '?': 'untracked',
    }

    createEmpty() {
        return {
            modified: [],
            added: [],
            deleted: [],
            copied: [],
            unmerged: [],
        }
    }

    parse() {
        if (this.row.length === 0) return

        this.row.forEach(str => {
            if (str.length < 3) return
            const index = str[0].trim() || null
            const work = str[1].trim() || null
            const data = str.slice(2).trim()

            if (!index && !work) return

            if (index == '?' && work == '?') {
                this.untracked.push(data)
            } else if (index == '#' && work == '#') {
                this.parseBranch(data)
            } else if (index === 'R') {
                this.parseRename(work, data)
            } else {
                this.parseFlags(index, work, data)
            }
        })
    }

    parseBranch(str) {
        const [, head, , upstream, , , ahead, , behind] = str.match(
            /^([a-zA-Z\-\_\/0-9]*)(\.\.\.)?([a-zA-Z\-\_\/0-9]*)?\s?(\[(ahead ([0-9]*))?,?\s?(behind ([0-9]*))?\])?/,
        )

        this.head = head
        this.upstream = upstream
        this.ahead = Number(ahead) || 0
        this.behind = Number(behind) || 0
    }

    parseRename(work, str) {
        const [, from, to] = str.match(/^(.*)\s\-\>\s(.*)/)

        const file = {
            from: from
                .trim()
                .replace(/^\"/, '')
                .replace(/\"$/, ''),
            to: to
                .trim()
                .replace(/^\"/, '')
                .replace(/\"$/, ''),
        }

        this.index.renamed.push(file)

        if (work) this.parseFlags(null, work, file)
    }

    parseFlags(index, work, file) {
        if (index == 'U' && work == 'U') {
            this.conflicts.push(file)
            return
        }

        if (index && this.index[GitStatus.NAMES[index]])
            this.index[GitStatus.NAMES[index]].push(file)
        if (work && this.work[GitStatus.NAMES[work]]) this.work[GitStatus.NAMES[work]].push(file)
    }
}

module.exports = GitStatus
