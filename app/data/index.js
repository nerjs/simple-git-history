const { ipcMain } = require('electron')
const { START, END } = require('../../utils/events')
const repos = require('./repos')
const Storage = require('../storage')

ipcMain.on(START, async ({ sender, frameId }) => {
    const storage = new Storage()
    const reRepos = await repos(sender, storage)

    const removeHandler = e => {
        if (e.frameId !== frameId) return

        reRepos()

        ipcMain.removeListener(END, removeHandler)
    }

    ipcMain.on(END, removeHandler)
})
