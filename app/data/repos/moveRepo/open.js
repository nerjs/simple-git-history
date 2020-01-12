const { shell } = require('electron')
const exec = require('../../../../utils/exec')

const TERM = /* process.env.TERM_PROGRAM || */ 'iTerm.app'

module.exports = (type, { pathname, url }) => {
    switch (type) {
        case 'file':
            return shell.openItem(pathname)
        case 'editor':
            return exec(`code ${pathname}`)
        case 'terminal':
            return exec(`open -a "${TERM}" ${pathname}`)
        case 'url':
            return exec(`open ${url}`)
    }
}
