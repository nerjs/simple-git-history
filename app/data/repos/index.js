const loadData = require('./loadData')
const addRepo = require('./addRepo')
const moveRepo = require('./moveRepo')

module.exports = async (sender, storage) => {
    const repos = await loadData(sender, storage)

    addRepo(sender, storage, repos)

    moveRepo(sender, storage, repos)
}
