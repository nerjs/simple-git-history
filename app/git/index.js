const qs = require('query-string')
const { branchFormat } = require('./utils/formats')
const CoreGit = require('./core')
class Git extends CoreGit {
    constructor(pathname) {
        super(pathname)
        this.branchFormat = branchFormat
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
}

// ;(async () => {
//     const git = new Git('/Users/mac/work/parser')
//     console.log(
//         (await git.branch()).filter(({ name }) =>
//             ['master', 'develop', 'test_git_branch', 'origin/refactoring-handlers'].find(
//                 n => n === name,
//             ),
//         ),
//     )
// })().catch(console.error)

module.exports = Git
