const { app } = require('electron')

const { CHANGE_CURRENT_REPO } = require('../../../utils/events')
const { CURRENT } = require('../repos/vars')
const Git = require('../../git')
const status = require('./status')
const fetch = require('./fetch')
const pull = require('./pull')
const push = require('./push')

module.exports = (sender, storage) => {
    let git,
        unsubRow = []

    const unsub = () => {
        unsubRow.forEach(cb => cb())
        unsubRow = []
    }

    const handleReloadRepo = async () => {
        const current = await storage.get(CURRENT)
        if (git) git.destroy()
        unsub()

        git = new Git(current)

        git.on('error', console.error)

        await status(git, sender)

        unsubRow = [fetch(git, sender), pull(git, sender), push(git, sender)]
    }

    handleReloadRepo()

    app.on(CHANGE_CURRENT_REPO, handleReloadRepo)

    return () => {
        if (git) git.destroy()
        unsub()
        app.removeListener(CHANGE_CURRENT_REPO, handleReloadRepo)
    }
}
