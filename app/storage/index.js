const fs = require('fs')
const path = require('path')
const util = require('util')

const FILES_DIR = path.join(__dirname, 'files')

const asyncStat = util.promisify(fs.stat).bind(fs)
const asyncRead = util.promisify(fs.readFile).bind(fs)
const asyncWrite = util.promisify(fs.writeFile).bind(fs)
const asyncReaddir = util.promisify(fs.readdir).bind(fs)
const asyncUnlink = util.promisify(fs.unlink).bind(fs)

const cache = new Map()

class Storage {
    async get(name) {
        if (cache.has(name)) return cache.get(name)
        const filePath = path.join(FILES_DIR, name)

        try {
            const stat = await asyncStat(filePath)
            if (!stat.isFile()) return null

            const value = (await asyncRead(filePath)).toString()

            cache.set(name, value)

            return value
        } catch (e) {
            return null
        }
    }

    async set(name, value) {
        if (!value) return this.delete(name)
        const filePath = path.join(FILES_DIR, name)
        await asyncWrite(filePath, `${value}`)
        cache.set(name, `${value}`)
    }

    async delete(name) {
        const filePath = path.join(FILES_DIR, name)
        cache.delete(name)
        try {
            await asyncStat(filePath)
        } catch (e) {
            return null
        }

        await asyncUnlink(filePath)

        return true
    }

    async clear() {
        const files = await asyncReaddir(FILES_DIR)
        return Promise.all(files.filter(fn => fn !== '.gitkeep').map(fn => this.delete(fn)))
    }
}

module.exports = Storage
