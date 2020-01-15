const log = require('./log')

module.exports = (title, message) => {
    return log({
        title: message ? title : 'Error',
        message: message || title,
        icon: 'error.png',
        destroy: true,
    })
}
