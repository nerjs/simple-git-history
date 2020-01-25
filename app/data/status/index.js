const { app } = require('electron')

const { CLEAR_STATUS, UPDATE_STATUS, CHANGE_CURRENT_REPO } = require('../../../utils/events')
const { CURRENT } = require('../repos/vars')
const Git = require('../../git')

module.exports = (sender, storage) => {
    let git

    const handleReloadRepo = async () => {
        const current = await storage.get(CURRENT)
        if (git) git.destroy()

        git = new Git(current)

        sender.send(CLEAR_STATUS)

        git.on('error', console.error)

        const status = await git.status()

        sender.send(UPDATE_STATUS, status)

        git.watchStatus((prev, cur) => sender.send(UPDATE_STATUS, cur))
    }

    handleReloadRepo()

    app.on(CHANGE_CURRENT_REPO, handleReloadRepo)

    return () => {
        app.removeListener(CHANGE_CURRENT_REPO, handleReloadRepo)
    }
}
