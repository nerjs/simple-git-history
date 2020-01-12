const { ipcMain, Notification, app } = require('electron')
const fs = require('fs')
const util = require('util')
const {
    REMOVE_REPO,
    SELECT_REPO,
    OPEN_REPO,
    CHANGE_CURRENT_REPO,
} = require('../../../../utils/events')
const checkRepo = require('../checkRepo')
const { CURRENT, REPOS } = require('../vars')
const open = require('./open')

const asyncStat = util.promisify(fs.stat).bind(fs)

let isSelectedRepo = false

module.exports = (sender, storage, repos) => {
    const handlerSelectRepo = async (_, pathname) => {
        if (!repos.find(r => r.pathname === pathname) || isSelectedRepo) return
        isSelectedRepo = true
        await checkRepo(sender, repos, pathname)
        await storage.set(CURRENT, pathname)
        sender.send(CHANGE_CURRENT_REPO, pathname)
        app.emit(CHANGE_CURRENT_REPO)
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

        await storage.set(REPOS, repos.map(r => r.pathname).join('\n'))
        sender.send(REMOVE_REPO, pathname)
    }

    const handlerOpenRepo = async (_, { type, pathname }) => {
        const repo = repos.find(r => r.pathname === pathname)
        if (!repo) return

        try {
            const stat = await asyncStat(pathname)
            if (!stat.isDirectory()) throw new Error(`${pathname} is not directory!`)
        } catch (e) {
            const ntf = new Notification({
                title: e.name || 'Error',
                body: e.message,
            })
            ntf.show()
            setTimeout(() => ntf.destroy(), 10000)
            console.error(e)
            return
        }

        await open(type, repo)
    }

    ipcMain.on(SELECT_REPO, handlerSelectRepo)
    ipcMain.on(REMOVE_REPO, handlerRemoveRepo)
    ipcMain.on(OPEN_REPO, handlerOpenRepo)

    return () => {
        ipcMain.removeListener(SELECT_REPO, handlerSelectRepo)
        ipcMain.removeListener(REMOVE_REPO, handlerRemoveRepo)
        ipcMain.removeListener(OPEN_REPO, handlerOpenRepo)
    }
}
