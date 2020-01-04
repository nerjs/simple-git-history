const path = require('path')
const fs = require('fs')
const util = require('util')

const STATIC_DIR = path.join(__dirname, '..', 'static')
const BUILD_DIR = path.join(__dirname, '..', 'build')

const canLoadFile = fileName =>
    new Promise(resolve => {
        fs.stat(fileName, err => resolve(!err))
    })

const buildFullPath = async fileName => {
    const hasStatic = await canLoadFile(path.join(STATIC_DIR, fileName))
    const { BUILD_TYPE, DEV_PORT } = process.env

    if (hasStatic) return path.join(STATIC_DIR, fileName)

    if (BUILD_TYPE === 'hot') return `http://localhost:${DEV_PORT}${fileName}`

    return path.join(BUILD_DIR, fileName)
}

const addFileJs = fileName => {
    console.info('Add JS file:', fileName)
    const script = document.createElement('script')

    script.src = fileName

    document.body.appendChild(script)

    return script
}

const addFile = {
    '.js': addFileJs,
}

module.exports = async fileName => {
    const fullPath = await buildFullPath(fileName)
    const extName = path.extname(fileName)

    if (!addFile[extName]) throw new TypeError(`Unknown file type [${extName}]`)

    return addFile[extName](fullPath)
}
