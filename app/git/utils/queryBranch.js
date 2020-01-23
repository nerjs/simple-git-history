const GitQuery = require('./query')

class QueryBranch extends GitQuery {
    parse(res) {
        return super.parse(res).message
    }
}

module.exports = QueryBranch
