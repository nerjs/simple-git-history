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

    async pull() {
        return this.git(new GitQuery('pull'))
    }

    async push() {
        return this.git(new GitQuery('push'))
    }

    async fetch() {
        return this.git(new GitQuery('fetch'))
    }

    destroy() {
        super.destroy()
    }
}

module.exports = Git
