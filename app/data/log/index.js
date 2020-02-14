const { app, ipcMain } = require('electron')

const { CHANGE_CURRENT_REPO, LOG_CLEAR, LOG_LIST, LOG_LOAD } = require('../../../utils/events')
const { CURRENT } = require('../repos/vars')
const Git = require('../../git')

module.exports = (sender, storage) => {
    let git

    const handleLoadLogs = async () => {
        if (!git) return

        sender.send(LOG_CLEAR)
        sender.send(LOG_LIST, await git.log())
    }

    const handleReloadRepo = async () => {
        const current = await storage.get(CURRENT)
        if (git) git.destroy()
        unsub()

        git = new Git(current)

        git.on('error', console.error)
    }

    handleReloadRepo()

    app.on(CHANGE_CURRENT_REPO, handleReloadRepo)
    ipcMain.on(LOG_LOAD, handleLoadLogs)

    return () => {
        if (git) git.destroy()
        git = null
        app.removeListener(CHANGE_CURRENT_REPO, handleReloadRepo)
        ipcMain.removeListener(LOG_LOAD, handleLoadLogs)
    }
}
