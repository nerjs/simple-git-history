const { app } = require('electron')
const {
    REPOS_LOAD,
    CURRENT_REPO,
    LIST_REPOS,
    CHANGE_CURRENT_REPO,
} = require('../../../utils/events')
const { CURRENT, REPOS } = require('./vars')
const checkRepo = require('./checkRepo')

module.exports = async (sender, storage) => {
    sender.send(REPOS_LOAD, true)

    const [currentRepo, _allRepos] = await Promise.all([storage.get(CURRENT), storage.get(REPOS)])

    const allRepos = (_allRepos ? _allRepos.split('\n') : []).map(pathname => ({ pathname }))

    sender.send(LIST_REPOS, allRepos)
    sender.send(CURRENT_REPO, currentRepo)
    app.emit(CHANGE_CURRENT_REPO)
    sender.send(REPOS_LOAD, false)

    Promise.all(allRepos.map(({ pathname }) => checkRepo(sender, allRepos, pathname)))

    return allRepos
}
