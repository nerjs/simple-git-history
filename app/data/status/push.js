const { ipcMain } = require('electron')
const { PUSH_REQUEST, PUSH_LOADING } = require('../../../utils/events')
const notif = require('../../notif')

module.exports = (git, sender) => {
    const handler = async () => {
        sender.send(PUSH_LOADING, true)
        try {
            await git.push()
        } catch (e) {
            notif.error('push', e.message)
        }
        sender.send(PUSH_LOADING, false)
    }

    ipcMain.on(PUSH_REQUEST, handler)

    return () => ipcMain.removeListener(PUSH_REQUEST, handler)
}
