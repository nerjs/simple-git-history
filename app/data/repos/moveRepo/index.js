const { ipcMain } = require('electron')
const { REMOVE_REPO, SELECT_REPO, CURRENT_REPO } = require('../../../../utils/events')
const checkRepo = require('../checkRepo')
const { CURRENT } = require('../vars')

let isSelectedRepo = false

module.exports = (sender, storage, repos) => {
    const handlerSelectRepo = async (_, pathname) => {
        if (!repos.find(r => r.pathname === pathname) || isSelectedRepo) return
        isSelectedRepo = true
        await checkRepo(sender, repos, pathname)
        await storage.set(CURRENT, pathname)
        sender.send(CURRENT_REPO, pathname)
        isSelectedRepo = false
    }

    const handlerRemoveRepo = async (_, pathname) => {
        const idx = repos.findIndex(r => r.pathname === pathname)
        if (idx < 0) return

        repos.splice(idx, 1)

        const current = await storage.get(CURRENT)

        if (current === pathname) {
            await handlerSelectRepo(_, repos[0].pathname)
        }

        sender.send(REMOVE_REPO, pathname)
    }

    ipcMain.on(SELECT_REPO, handlerSelectRepo)
    ipcMain.on(REMOVE_REPO, handlerRemoveRepo)

    return () => {
        ipcMain.removeListener(SELECT_REPO, handlerSelectRepo)
        ipcMain.removeListener(REMOVE_REPO, handlerRemoveRepo)
    }
}
