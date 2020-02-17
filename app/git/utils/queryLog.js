const QueryFormat = require('./queryFormat')

class QueryLog extends QueryFormat {
    constructor(format, valuesFormat) {
        super(`log --branches --tags --remotes --cherry-mark`, format, valuesFormat)
    }
}

module.exports = QueryLog

console.log(`${new QueryLog(1, 2, { body: '%B' })}`)
