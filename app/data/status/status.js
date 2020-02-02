const { CLEAR_STATUS, UPDATE_STATUS } = require('../../../utils/events')

module.exports = async (git, sender) => {
    sender.send(CLEAR_STATUS)

    const status = await git.status()

    sender.send(UPDATE_STATUS, status)

    git.watchStatus((prev, cur) => sender.send(UPDATE_STATUS, cur))
}
