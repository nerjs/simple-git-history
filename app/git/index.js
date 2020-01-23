const qs = require('query-string')
const { branchFormat, branchDefFormat, reflogFormat } = require('./utils/formats')
const CoreGit = require('./core')
const GitQuery = require('./utils/query')
const QueryFormat = require('./utils/queryFormat')
const QueryBranch = require('./utils/queryBranch')
const QueryStatus = require('./utils/queryStatus')

class Git extends CoreGit {
    constructor(pathname) {
        super(pathname)
        this.branchFormat = branchFormat
        this.branchDefFormat = branchDefFormat
        this.reflogFormat = reflogFormat
    }

    async branch() {
        return this.git(new QueryFormat('branch', this.branchFormat, this.branchDefFormat))
    }

    watchBranch(cb) {
        return this.watch(new QueryFormat('branch', this.branchFormat, this.branchDefFormat), cb)
    }

    async checkout(name) {
        return this.git(new QueryBranch(`checkout ${name}`))
    }

    async addBranch(name) {
        return this.git(new QueryBranch(`branch ${name}`))
    }

    async removeBranch(name) {
        return this.git(new QueryBranch(`branch -D ${name}`))
    }

    async status() {
        return this.git(new QueryStatus())
    }

    watchStatus(cb) {
        return this.watch(new QueryStatus(), cb)
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
;(async () => {
    const git = new Git('/Users/mac/homework/tg')

    git.watchStatus((...a) => console.log(a))
    // const { message } = await git.git('status --porcelain')
    // console.log([...message].length, message.length, message, [...message], await git.status())
    setInterval(() => {}, 1000000)
})().catch(console.error)
