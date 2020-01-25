const { ipcMain } = require('electron')
const { START, END } = require('../../utils/events')
const repos = require('./repos')
const Storage = require('../storage')
const branches = require('./branches')
const status = require('./status')

ipcMain.on(START, async ({ sender, frameId }) => {
    const storage = new Storage()

    const reRepos = await repos(sender, storage)

    const reBranches = await branches(sender, storage)

    const reStatus = await status(sender, storage)

    const removeHandler = e => {
        if (e.frameId !== frameId) return

        reRepos()
        reBranches()
        reStatus()

        ipcMain.removeListener(END, removeHandler)
    }

    ipcMain.on(END, removeHandler)
})
