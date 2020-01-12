const { app } = require('electron')
const { CHANGE_CURRENT_REPO } = require('../../../utils/events')
const { CURRENT } = require('../repos/vars')

module.exports = (sender, storage) => {
    const handlerReloadBaranch = async () => {
        console.log('------', CHANGE_CURRENT_REPO, await storage.get(CURRENT))
    }

    app.on(CHANGE_CURRENT_REPO, handlerReloadBaranch)
    return () => {
        app.removeListener(CHANGE_CURRENT_REPO, handlerReloadBaranch)
    }
}
