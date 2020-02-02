const { ipcMain } = require('electron')
const { FETCH_REQUEST, FETCH_LOADING } = require('../../../utils/events')
const notif = require('../../notif')

module.exports = (git, sender) => {
    const handler = async () => {
        sender.send(FETCH_LOADING, true)
        try {
            await git.fetch()
        } catch (e) {
            notif.error('fetch', e.message)
        }
        sender.send(FETCH_LOADING, false)
    }

    ipcMain.on(FETCH_REQUEST, handler)

    return () => ipcMain.removeListener(FETCH_REQUEST, handler)
}
