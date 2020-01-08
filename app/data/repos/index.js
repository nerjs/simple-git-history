const loadData = require('./loadData')
const addRepo = require('./addRepo')

module.exports = async (sender, storage) => {
    const repos = await loadData(sender, storage)

    addRepo(sender, storage, repos)
}
