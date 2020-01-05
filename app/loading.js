const path = require('path')
const fs = require('fs')
const createWindow = require('../utils/createWindow')
const sleep = require('../utils/sleep')

const BUILD_DIR = path.join(__dirname, '..', 'build')

const hasFiles = () =>
    new Promise(resolve => {
        fs.stat(BUILD_DIR, (err, stat) => {
            if (err) return resolve(false)
            if (!stat.isDirectory()) return resolve(false)

            fs.readdir(BUILD_DIR, (err, res) => {
                if (err || !res || !res.length) return resolve(false)
                resolve(true)
            })
        })
    })

const checkFiles = async () => {
    if (await hasFiles()) return

    await sleep(200)

    await checkFiles()
}

module.exports = async () => {
    if (await hasFiles()) return

    const win = createWindow(path.join(__dirname, '..', 'views', 'loading.html'), { frame: false })

    const ready = () => new Promise(resolve => win.once('ready-to-show', resolve))

    win.setContentSize(400, 400)
    win.center()

    await ready()

    await checkFiles()

    await sleep(200)

    win.hide()

    setTimeout(() => win.close(), 1000)
}
