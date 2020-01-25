const GitQuery = require('./query')
const GitStatus = require('./status')

class QueryStatus extends GitQuery {
    constructor() {
        super('status --porcelain=v1 -b')
    }

    parse(res) {
        const { message } = super.parse(res)
        return new GitStatus(message)
    }
}

module.exports = QueryStatus
