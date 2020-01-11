const { ipcMain } = require('electron')
const { REMOVE_REPO, SELECT_REPO, CURRENT_REPO } = require('../../../../utils/events')
const checkRepo = require('../checkRepo')
const { CURRENT } = require('../vars')

let isSelectedRepo = false

module.exports = (sender, storage, repos) => {
    ipcMain.on(SELECT_REPO, async (_, pathname) => {
        if (!repos.find(r => r.pathname === pathname) || isSelectedRepo) return
        isSelectedRepo = true
        await checkRepo(sender, repos, pathname)
        await storage.set(CURRENT, pathname)
        sender.send(CURRENT_REPO, pathname)
        isSelectedRepo = false
    })

    ipcMain.on(REMOVE_REPO, (_, pathname) => {
        if (!repos.find(r => r.pathname === pathname)) return
    })
}
