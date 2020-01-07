const { ipcMain } = require('electron')
const { REPOS_LOAD } = require('../../utils/events')

module.exports = (sender, storage) => {
    sender.send(REPOS_LOAD, true)

    setTimeout(() => sender.send(REPOS_LOAD, false), 10000)
}
