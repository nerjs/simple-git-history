const { ipcMain } = require('electron')
const { ADD_REPO, ADD_REPO_IN_LIST, CHANGE_CURRENT_REPO } = require('../../../utils/events')
const { CURRENT, REPOS } = require('./vars')
const checkRepo = require('./checkRepo')

module.exports = (sender, storage, repos) => {
    const handlerAddRepo = async (_, str) => {
        if (!str) return

        if (!repos.find(({ pathname }) => pathname === str)) {
            repos.unshift({ pathname: str })
            sender.send(ADD_REPO_IN_LIST, { pathname: str })
        }

        await Promise.all([
            storage.set(CURRENT, str),
            storage.set(REPOS, repos.map(({ pathname }) => pathname).join('\n')),
        ])

        sender.send(CHANGE_CURRENT_REPO, str)

        checkRepo(sender, repos, str)
    }

    ipcMain.on(ADD_REPO, handlerAddRepo)

    return () => ipcMain.removeListener(ADD_REPO, handlerAddRepo)
}
