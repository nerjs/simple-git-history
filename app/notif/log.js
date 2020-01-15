const { ipcMain, Notification, app } = require('electron')
const path = require('path')

module.exports = ({ title, message, icon, destroy, ...options }) => {
    const imgDir = path.join(__dirname, '..', '..', 'static', 'img', 'notifications')

    const ntf = new Notification({
        title: title || 'Log',
        body: message,
        icon: path.join(imgDir, icon || 'log.png'),
        ...options,
    })

    ntf.show()

    if (destroy) setTimeout(() => ntf.destroy(), 10000)

    return ntf
}
