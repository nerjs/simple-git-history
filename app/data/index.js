const { ipcMain } = require('electron')
const { START } = require('../../utils/events')

const startLoad = sender => {
    console.log('Start')
}

ipcMain.on(START, ({ sender }) => {
    startLoad(sender)
})
