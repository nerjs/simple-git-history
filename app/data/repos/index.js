const loadData = require('./loadData')
const addRepo = require('./addRepo')
const moveRepo = require('./moveRepo')

module.exports = async (sender, storage) => {
    const repos = await loadData(sender, storage)

    const removeAddrepo = addRepo(sender, storage, repos)

    const removeMoveRepo = moveRepo(sender, storage, repos)

    return () => {
        removeAddrepo()
        removeMoveRepo()
    }
}
