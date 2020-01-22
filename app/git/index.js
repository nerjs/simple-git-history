const qs = require('query-string')
const { branchFormat, branchDefFormat, reflogFormat } = require('./utils/formats')
const CoreGit = require('./core')
const GitQuery = require('./utils/query')

class Git extends CoreGit {
    constructor(pathname) {
        super(pathname)
        this.branchFormat = branchFormat
        this.branchDefFormat = branchDefFormat
        this.reflogFormat = reflogFormat
    }

    async branch() {
        const gq = new GitQuery('branch', this.branchFormat, this.branchDefFormat)

        const res = await this.git(gq)

        return gq.parse(res)
    }

    watchBranch(cb) {
        const gq = new GitQuery('branch', this.branchFormat, this.branchDefFormat)

        return this.watch(gq, (prev, current) => {
            cb(gq.parse(prev), gq.parse(current))
        })
    }

    async checkout(name) {
        return this.git(`checkout ${name}`)
    }

    async addBranch(name) {
        return this.git(`branch ${name}`)
    }

    async removeBranch(name) {
        return this.git(`branch -D ${name}`)
    }

    async reflog(count = 10) {
        const res = await this.git(
            `reflog --max-count=${count} --format="${qs.stringify(this.reflogFormat, {
                encode: false,
            })}"`,
        )

        return res
            .split('\n')
            .filter(l => !!l)
            .map(l => qs.parse(l))
            .map(({ authorDate, committerDate, refName, ...l }) => ({
                ...l,
                refName: refName || null,
                authorDate: Number(authorDate),
                committerDate: Number(committerDate),
            }))
            .reverse()
    }

    destroy() {
        super.destroy()
    }
}

module.exports = Git
