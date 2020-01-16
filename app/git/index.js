const qs = require('query-string')
const { branchFormat, reflogFormat } = require('./utils/formats')
const CoreGit = require('./core')
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
class Git extends CoreGit {
    constructor(pathname) {
        super(pathname)
        this.branchFormat = branchFormat
        this.reflogFormat = reflogFormat

        this[WATCHED] = false
    }

    async branch() {
        const res = await this.git(
            `branch --format="${qs.stringify(this.branchFormat, { encode: false })}"`,
        )

        return res
            .split('\n')
            .filter(v => !!v)
            .map(v => qs.parse(v))
            .map(({ head, remote, ...v }) => ({
                ...v,
                head: head.trim() ? true : false,
                remote: remote.trim() || null,
            }))
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
    }

    watch() {
        this[WATCHED] = true
        this.emit(START_WATCH, this.pathname)
    }

    watchEnd() {
        if (!this[WATCHED]) return
        this[WATCHED] = false
        this.emit(END_WATCH, this.pathname)
    }

    destroy() {
        this.watchEnd()
        super.destroy()
    }
}

// ;(async () => {
//     const git = new Git('/Users/mac/homework/simple-git-history')
//     console.log(
//         (await git.branch()).filter(({ name }) =>
//             ['master', 'develop', 'test_git_branch', 'origin/refactoring-handlers'].find(
//                 n => n === name,
//             ),
//         ),
//     )
// })().catch(console.error)

module.exports = Git
