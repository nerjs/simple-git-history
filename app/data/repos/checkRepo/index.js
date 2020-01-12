const fs = require('fs')
const util = require('util')
const path = require('path')
const { CHANGE_REPO } = require('../../../../utils/events')
const getName = require('./getName')
const Git = require('../../../git')

const asyncStat = util.promisify(fs.stat).bind(fs)
const asyncRead = util.promisify(fs.readFile).bind(fs)

module.exports = async (sender, repos, pathname) => {
    const repo = repos.find(r => r.pathname === pathname)
    if (!repo) return
    sender.send(CHANGE_REPO, { ...repo, loading: true })
    try {
        const stat = await asyncStat(pathname)
        if (!stat.isDirectory()) throw new Error(`path ${pathname} is not directory`)

        let statGit

        try {
            statGit = await asyncStat(path.join(pathname, '.git'))
            if (!statGit.isDirectory()) throw new Error()
        } catch (_e) {
            throw new Error('path is not a git repository')
        }

        let pkg = {}

        try {
            await asyncStat(path.join(pathname, 'package.json'))
            pkg = JSON.parse(await asyncRead(path.join(pathname, 'package.json')))
        } catch (e) {
            console.error(e)
        }

        repo.name = getName(repos, pathname, pkg)

        const git = new Git(pathname)

        try {
            repo.url = await git.getUrl()
        } catch (e) {}

        sender.send(CHANGE_REPO, { ...repo })
    } catch (e) {
        sender.send(CHANGE_REPO, { ...repo, error: e.message })
    }

    sender.send(CHANGE_REPO, { ...repo, loading: false })
}
