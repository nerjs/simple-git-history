require('dotenv').config()
const { app } = require('electron')
const path = require('path')
const createWindow = require('../utils/createWindow')
const devTools = require('../utils/devTools')
const loading = require('./loading')

app.on('ready', async () => {
    await loading()
    const win = createWindow(path.join(__dirname, '..', 'views', 'main.html'))

    win.webContents.on('keypress', console.log)

    devTools(win)

    win.maximize()
})

app.on('window-all-closed', () => {
    app.quit()
})
