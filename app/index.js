require('dotenv').config()
const { app } = require('electron')
const path = require('path')
const createWindow = require('../utils/createWindow')
const devTools = require('../utils/devTools')
const loading = require('./loading')
require('./data')

app.on('ready', async () => {
    await loading()
    const win = createWindow(path.join(__dirname, '..', 'views', 'main.html'))

    devTools(win)

    win.maximize()
})

app.on('window-all-closed', () => {
    app.quit()
})
