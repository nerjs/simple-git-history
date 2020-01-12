const path = require('path')
const { ipcRenderer } = require('electron')
const { END } = require('./events')

global.STATIC_DIR = path.join(__dirname, '..', 'static')
global.BUILD_DIR = path.join(__dirname, '..', 'build')

window.onbeforeunload = () => {
    ipcRenderer.send(END)
}
