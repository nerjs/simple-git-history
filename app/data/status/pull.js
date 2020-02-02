const { ipcMain } = require('electron')
const { PULL_REQUEST, PULL_LOADING } = require('../../../utils/events')
const notif = require('../../notif')

module.exports = (git, sender) => {
    const handler = async () => {
        sender.send(PULL_LOADING, true)
        try {
            await git.pull()
        } catch (e) {
            notif.error('pull', e.message)
        }
        sender.send(PULL_LOADING, false)
    }

    ipcMain.on(PULL_REQUEST, handler)

    return () => ipcMain.removeListener(PULL_REQUEST, handler)
}
