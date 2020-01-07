const { ipcMain } = require('electron')
const { START } = require('../../utils/events')
const repos = require('./repos')
const Storage = require('../storage')

ipcMain.on(START, ({ sender }) => {
    const storage = new Storage()
    repos(sender, storage)
})
