const { ipcMain } = require('electron')
const { START, END } = require('../../utils/events')
const repos = require('./repos')
const Storage = require('../storage')
const branches = require('./branches')

ipcMain.on(START, async ({ sender, frameId }) => {
    const storage = new Storage()

    const reRepos = await repos(sender, storage)

    const reBranches = await branches(sender, storage)

    const removeHandler = e => {
        if (e.frameId !== frameId) return

        reRepos()
        reBranches()

        ipcMain.removeListener(END, removeHandler)
    }

    ipcMain.on(END, removeHandler)
})
