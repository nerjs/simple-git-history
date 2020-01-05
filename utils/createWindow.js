const { BrowserWindow } = require('electron')
const url = require('url')
let wins = {}

module.exports = (pathname, options = {}) => {
    if (wins[pathname]) return wins[pathname]

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        center: true,
        devTools: true,
        webPreferences: {
            nodeIntegration: true,
        },
        ...options,
    })
    win.loadURL(
        url.format({
            pathname,
            protocol: 'file:',
            slashes: true,
        }),
    )

    win.on('closed', () => {
        wins[pathname] = null
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    wins[pathname] = win

    win.__wins = wins

    return win
}
