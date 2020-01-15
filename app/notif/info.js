const log = require('./log')

module.exports = (title, message) => {
    return log({
        title: message ? title : 'Info',
        message: message || title,
        icon: 'info.png',
        destroy: true,
    })
}
