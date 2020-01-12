const EE = require('events')
const path = require('path')
const gitUrlParse = require('git-url-parse')
const qs = require('query-string')
const exec = require('../../utils/exec')
const { branchFormat } = require('./utils/formats')

class Git extends EE {
    constructor(pathname) {
        super()
        this.pathname = pathname
        this.branchFormat = branchFormat
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

    async branch() {
        console.log('--', qs.stringify(this.branchFormat, { encode: false }))
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
