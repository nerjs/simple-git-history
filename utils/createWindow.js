const { BrowserWindow } = require('electron')
const url = require('url')
let win = null

module.exports = pathname => {
    if (win) win.close()

    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        center: true,
        devTools: true,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    win.loadURL(
        url.format({
            pathname,
            protocol: 'file:',
            slashes: true,
        }),
    )

    win.on('closed', () => {
        win = null
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    return win
}
