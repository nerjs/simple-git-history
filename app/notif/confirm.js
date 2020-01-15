const { dialog } = require('electron')
const path = require('path')

module.exports = async (title, message) => {
    const { response } = await dialog.showMessageBox({
        type: 'question',
        title,
        message,
        detail: title,
        icon: path.join(__dirname, '..', '..', 'static', 'img', 'notifications', 'question.png'),
        buttons: ['Cancel', 'Confirm'],
        noLink: true,
    })

    return !!response
}
